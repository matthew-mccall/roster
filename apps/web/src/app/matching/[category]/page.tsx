import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json';
import { notFound } from 'next/navigation';
import { Alert, AlertLink, Card, CardBody, CardText, Col, Form, Row } from 'react-bootstrap';
import { AccountModel, MatchingPoolModel, MatchingPoolSide, RosterModel, RosterEntry, Gender } from '@roster/common';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';
import SubmitButton from '../../../components/SubmitButton';
import DatingProfileQuestionnaire from '../../../components/Questionnaires/DatingProfileQuestionnaire';
import FriendsProfileQuestionnaire from '../../../components/Questionnaires/FriendsProfileQuestionnaire';
import StudyProfileQuestionnaire from '../../../components/Questionnaires/StudyProfileQuestionnaire';
import Image from 'next/image';

export default async function Matching({ params }: { params: { category: string } }) {
  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route;
  });

  if (!categoryRoutes.includes(params.category)) {
    notFound();
  }

  const account = await getOrCreateAccount({ required: true });

  if (!account) {
    return;
  }

  async function submitPreference(userID: string, preferredUserID: string) {
    await calculateElo(userID, preferredUserID);
    await updateRoster(userID, preferredUserID);
  }

  async function calculateElo(userID: string, preferredUserID: string) {
    const user = await AccountModel.findById(userID).exec();
    const preferredUser = await AccountModel.findById(preferredUserID).exec();

    if (user && preferredUser) {
      const k = 32;
      const expectedScore = 1 / (1 + Math.pow(10, (preferredUser.elo - user.elo) / 400));
      const newElo = user.elo + k * (1 - expectedScore);

      user.elo = newElo;
      await user.save();
    }
  }

  async function updateRoster(userID: string, preferredUserID: string) {
    let roster = await RosterModel.findOne({ account: userID }).exec();
    if (!roster) {
      roster = new RosterModel({ account: userID, entries: [] });
    }

    const entryIndex = roster.entries.findIndex(entry => entry.account.toString() === preferredUserID);
    if (entryIndex > -1) {
      roster.entries[entryIndex].score += 1;
    } else {
      roster.entries.push({ account: preferredUserID, score: 1 });
    }

    await roster.save();
  }

  function getUniqueCandidates(candidates: string[], exclude: string[]): [string, string] {
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
        <Alert variant={'secondary'}>
          Please complete the <Link href={'/'} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first
        </Alert>
      </Container>
    );
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
    pool = await MatchingPoolModel.findById(profile.pool);
  }

  if (!pool) {
    pool = await MatchingPoolModel.findOne({ type: params.category }).exec();
  }

  if (!pool) {
    pool = new MatchingPoolModel({ type: params.category, left: [], right: [] });
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

  const candidates =
    profile.poolSide == MatchingPoolSide.Left
      ? pool.right
      : pool.left;

  const [user1Ref, user2Ref] = getUniqueCandidates(candidates, [account._id]);

  // TODO: Better solution may be to build a queue and pop people off the queue, to make sure we go through everyone before we repeat
  const user1 = await AccountModel.findOne({ clerkUserId: user1Ref }).exec();
  const user2 = await AccountModel.findOne({ clerkUserId: user2Ref }).exec();
  // const user1 = null;
  // const user2 = null;

  if (!user1 || !user2) {
    return (
      <div className={'text-center'}>
        <SignedIn>
          <h1 className={'text-primary fw-semibold display-1'}>The show's over</h1>
          <p className={'lead'}>We ran out of people to show you. Check in later.</p>
        </SignedIn>
      </div>
    );
  }

  // Initialize ELO scores if not already set
  if (!user1.elo) {
    user1.elo = 400;
    await user1.save();
  }
  if (!user2.elo) {
    user2.elo = 400;
    await user2.save();
  }

  return (
    <Container>
      <Row className="justify-content-center">
        {[user1, user2].map((account, key) => (
          <Col md={4} key={key}>
            <Form
              action={async () => {
                'use server';
                await submitPreference(profile._id, account._id);
                window.location.reload(); // Trigger re-render by reloading the page
              }}
            >
              <Card style={{ width: '100%', height: '500px', marginBottom: '20px', position: 'relative' }}>
                <Image src={account.generalProfile?.image || '/default.png'} alt={account.generalProfile?.name} layout="fill" objectFit="cover" />
                <CardBody className="d-flex flex-column justify-content-end align-items-start" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <CardText style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{account.generalProfile?.name}</CardText>
                  <CardText style={{ fontSize: '1rem', color: 'white' }}>
                    Gender: {(() => {
                    const gender = account.generalProfile?.gender;
                    if (gender === 1) {
                      return "Male";
                    } else if (gender === 2) {
                      return "Female";
                    } else if (gender === 3) {
                      return "Non-Binary";
                    } else {
                      return "Other";
                    }
                  })()}
                  </CardText>
                  <CardText style={{ fontSize: '1rem', color: 'white' }}>Interests: {account.generalProfile?.interests.join(', ')}</CardText>
                  <CardText style={{ fontSize: '1rem', color: 'white' }}>Dislikes: {account.generalProfile?.dislikes.join(', ')}</CardText>
                  {account.roommateProfile && (
                    <>
                      {/* <CardText style={{ fontSize: '1rem', color: 'white' }}>Roommate Profile Details</CardText> */}
                      {/* Add additional RoommateProfile attributes here */}
                    </>
                  )}
                  <SubmitButton className="w-100">Like</SubmitButton>
                </CardBody>
              </Card>
            </Form>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
