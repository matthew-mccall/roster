import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json';
import { notFound } from 'next/navigation';
// import nodemailer from 'nodemailer';
import { Alert, AlertLink, Card, CardBody, CardImg, CardText, CardTitle, Col, Form, Row } from 'react-bootstrap';
import { AccountModel, MatchingPoolModel, MatchingPoolSide, RosterEntry, Gender } from '@roster/common';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';
import SubmitButton from '../../../components/SubmitButton';
import DatingProfileQuestionnaire from '../../../components/Questionnaires/DatingProfileQuestionnaire';
import FriendsProfileQuestionnaire from '../../../components/Questionnaires/FriendsProfileQuestionnaire';
import StudyProfileQuestionnaire from '../../../components/Questionnaires/StudyProfileQuestionnaire';

export default async function Matching({ params }: { params: { category: string } })
{
  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route
  })

  if (!categoryRoutes.includes(params.category)) {
    notFound()
  }

  const account = await getOrCreateAccount({ required: true })

  if (!account) {
    return;
  }

  async function submitPreference(userID: string, preferredUserID: string) {
    await calculateElo(userID, preferredUserID);
    // await updateRoster(userID, preferredUserID);
  }

  async function calculateElo(losingUserId: string, winningUserId: string) {
    const losingUser = await AccountModel.findById(losingUserId).exec();
    const winningUser = await AccountModel.findById(winningUserId).exec();

    if (!losingUser || !winningUser) {
      return;
    }

    let losingUserEntry = losingUser.roommateProfile!.roster.entries.find(entry => {
      return entry.account._id == losingUser._id;
    })

    if (!losingUserEntry) {
      losingUserEntry = new RosterEntry();
      losingUserEntry.account = losingUser._id;
      losingUserEntry.score = 400;
    }

    let winningUserEntry = winningUser.roommateProfile!.roster.entries.find(entry => {
      return entry.account._id == winningUser._id;
    })

    if (!winningUserEntry) {
      winningUserEntry = new RosterEntry();
      winningUserEntry.account = winningUser._id;
      winningUserEntry.score = 400;
    }

    const k = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (winningUserEntry.score - losingUserEntry.score) / 400));
    const newElo = losingUserEntry.score + k * (1 - expectedScore);

    losingUserEntry.score = newElo;
    losingUser.roommateProfile!.roster.entries.push(losingUserEntry);
    losingUser.save();

    // TODO: Calculate ELO for winning user
  }

  // async function updateRoster(userID: string, preferredUserID: string) {
  //   let roster = await RosterModel.findOne({ account: userID }).exec();
  //   if (!roster) {
  //     roster = new RosterModel({ account: userID, entries: [] });
  //   }
  //
  //   const entryIndex = roster.entries.findIndex(entry => entry.account.toString() === preferredUserID);
  //   if (entryIndex > -1) {
  //     roster.entries[entryIndex].score += 1;
  //   } else {
  //     roster.entries.push({ account: preferredUserID, score: 1 });
  //   }
  //
  //   await roster.save();
  // }
  async function sendEmailToUsers(user1Email: string, user2Email: string) {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail', // or use your preferred email service
    //     auth: {
    //         user: 'chunlinfeng0920@gmail.com',
    //         pass: 'bjpx qnvv musv fvez',
    //     },
    // });
    //
    // let mailOptions = {
    //   from: 'chunlinfeng0920@gmail.com',
    //   to: `${user1Email}, ${user2Email}`,
    //   subject: 'You have a new match!',
    //   text: 'Congratulations! You have been matched. Check your profile for more details.',
    // };
    //
    // try {
    //     await transporter.sendMail(mailOptions);
    //     console.log('Emails sent successfully');
    // } catch (error) {
    //     console.error('Error sending emails:', error);
    // }
  }

  function getUniqueCandidates(candidates: string[], exclude: string[]): [string | null, string | null] {
    const uniqueCandidates = candidates.filter(candidate => !exclude.includes(candidate));
    if (uniqueCandidates.length < 2) {
      // throw new Error("Not enough unique candidates available");
      // prevents errors in the development environment when there are fewer candidates available
      return [null, null];
    }

    let user1Ref, user2Ref;
    do {
      user1Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
      user2Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
    } while (user1Ref === user2Ref);

    return [user1Ref, user2Ref];
  }


  if (!account || !account.generalProfile) {
    return (
      <Container>
        <Alert variant={"secondary"}>Please complete the <Link href={"/"} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first</Alert>
      </Container>
    )
  }

  let profile;
  let questionnaire;

  switch (params.category) {
    case categories.Roommates.route:
      profile = account.roommateProfile;
      questionnaire = <RoommateProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />;
      break;
    case categories.Dating.route:
      profile = account.datingProfile;
      questionnaire = <DatingProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />;
      break;
    case categories.Friends.route:
      profile = account.friendsProfile;
      questionnaire = <FriendsProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />;
      break;
    case categories['Study Groups'].route:
      profile = account.studyProfile;
      questionnaire = <StudyProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />;
      break;
  }

  if (!profile) {
    return (
      <Container>
        <h1>Tell us about yourself...</h1>
        {questionnaire}
      </Container>
    );
  }

  let pool;

  if (profile.pool) {
    pool = await MatchingPoolModel.findById(profile.pool)
  }

  if (!pool) {
    pool = await MatchingPoolModel.findOne({ type: params.category }).exec();
  }

  if (!pool) {
    pool = new MatchingPoolModel({ type: params.category, left: [], right: [] })
  }

  if (!pool.left.includes(account.clerkUserId) && !pool.right.includes(account.clerkUserId)) {
    switch (params.category) {
      case categories.Roommates.route:
        if (pool.left.length < pool.right.length) {
          profile.poolSide = MatchingPoolSide.Left;
          pool.left.push(account.clerkUserId);
        } else {
          profile.poolSide = MatchingPoolSide.Right;
          pool.right.push(account.clerkUserId);
        }
        break;
      case categories.Dating.route:
        if (account.generalProfile.gender == Gender.Male) {
          profile.poolSide = MatchingPoolSide.Left;
          pool.left.push(account.clerkUserId);
        } else {
          profile.poolSide = MatchingPoolSide.Right;
          pool.right.push(account.clerkUserId);
        }
        break;
      case categories.Friends.route:
        if (pool.left.length < pool.right.length) {
          profile.poolSide = MatchingPoolSide.Left;
          pool.left.push(account.clerkUserId);
        } else {
          profile.poolSide = MatchingPoolSide.Right;
          pool.right.push(account.clerkUserId);
        }
        break;
      case categories['Study Groups'].route:
        if (pool.left.length < pool.right.length) {
          profile.poolSide = MatchingPoolSide.Left;
          pool.left.push(account.clerkUserId);
        } else {
          profile.poolSide = MatchingPoolSide.Right;
          pool.right.push(account.clerkUserId);
        }
        break;
    }
  }

  profile.pool = pool;
  await Promise.all([account.save(), pool.save()]);

  const candidates = profile.poolSide == MatchingPoolSide.Left ? pool.right : pool.left;

  // Extract string IDs from the candidates
  const candidateIds = candidates.map(candidate => candidate.toString());

  const [user1Ref, user2Ref] = getUniqueCandidates(candidateIds, [account.toString()]);
  // TODO: Better solution may be to build a queue and pop people off the queue, to make sure we go through everyone before we repeat

  const user1 = await AccountModel.findOne({ clerkUserId: user1Ref }).exec();
  const user2 = await AccountModel.findOne({ clerkUserId: user2Ref }).exec();

  if (!user1 || !user2) {
    return (
      <div className={'text-center'}>
        <SignedIn>
          <h1 className={'text-primary fw-semibold display-1'}>The show&apos;s over</h1>
          <p className={'lead'}>We ran out of people to show you. Check in later.</p>
        </SignedIn>
      </div>
    );
  }

  // if (!user1.elo) {
  //   user1.elo = 400;
  //   await user1.save();
  // }
  // if (!user2.elo) {
  //   user2.elo = 400;
  //   await user2.save();
  // }

  return (
    <Container>
      <Row className="justify-content-center">
        {[user1, user2].map((account, key) => (
          <Col md={4} key={key}>
            <Form
              action={async () => {
                'use server';
                await submitPreference(profile._id, account._id as string);
                window.location.reload(); // Trigger re-render by reloading the page
              }}
            >
              <Card>
                <CardImg variant={"top"} src={`https://placehold.co/400?text=Picture+of+${account.generalProfile.name.replace(' ', '+')}`} />
                <CardBody>
                  <CardTitle>{account.generalProfile?.name}</CardTitle>
                  <CardText>
                    Gender: {(() => {
                    const gender = account.generalProfile?.gender;
                    if (gender === 1) {
                      return 'Male';
                    } else if (gender === 2) {
                      return 'Female';
                    } else if (gender === 3) {
                      return 'Non-Binary';
                    } else {
                      return 'Other';
                    }
                  })()}
                    <br />
                    Interests: {account.generalProfile?.interests.join(', ')}
                    <br />
                    Dislikes: {account.generalProfile?.dislikes.join(', ')}
                  </CardText>
                    {account.roommateProfile && params.category == categories.Roommates.route && (
                      <CardText>
                        Bio: {account.roommateProfile.bio}
                      </CardText>
                    )}
                    <SubmitButton className="w-100">Like</SubmitButton>
                </CardBody>
              </Card>
            </Form>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
