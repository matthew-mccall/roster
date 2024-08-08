import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json';
import { notFound } from 'next/navigation';
import { Alert, AlertLink, Card, CardBody, CardText, Form, Stack } from 'react-bootstrap';
import { AccountModel, MatchingPoolModel, MatchingPoolSide, MatchModel } from '@roster/common';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';
import SubmitButton from '../../../components/SubmitButton';
import DatingProfileQuestionnaire from '../../../components/Questionnaires/DatingProfileQuestionnaire';
import FriendsProfileQuestionnaire from '../../../components/Questionnaires/FriendsProfileQuestionnaire';
import StudyProfileQuestionnaire from '../../../components/Questionnaires/StudyProfileQuestionnaire';

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
  // const router = useRouter();

  // async function handleSubmit(accountId: string) {
  //   router.push('/matching/results');
  // }
  async function submitPreference(userID: string) {
    // TODO: Calculate ELO, update roster entries

  }

  if (!account || !account.generalProfile) {
    return (
      <Container>
        <Alert variant={'secondary'}>Please complete the <Link href={'/'} passHref legacyBehavior><AlertLink>general
          questionnaire</AlertLink></Link> first</Alert>
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
        break;
    }
  }

  profile.pool = pool;
  await Promise.all([account.save(), pool.save()]);

  const candidates =
    profile.poolSide == MatchingPoolSide.Left
      ? pool.right
      : pool.left;

  const user1Ref = candidates[Math.floor(Math.random() * candidates.length)];
  const user2Ref = candidates[Math.floor(Math.random() * candidates.length)];

  // TODO: Better solution may be to build a queue and pop people off the queue, to make sure we go through everyone before we repeat

  const user1 = await AccountModel.findOne({ clerkUserId: user1Ref }).exec();
  const user2 = await AccountModel.findOne({ clerkUserId: user2Ref }).exec();

  // const user1 = null;
  // const user2 = null;

  async function getMatchedUserId(userId: string): Promise<string | null> {
    // Look for a match where the user is either `user1` or `user2`
    const match = await MatchModel.findOne({
      $or: [
        { user1: userId },
        { user2: userId }
      ],
      type: params.category
    }).exec();
  
    if (!match) {
      return null;
    }
  
    // Determine the matched user ID
    const matchedUserId = match.user1.toString() === userId ? match.user2.toString() : match.user1.toString();
    return matchedUserId;
  }

  const matchedUserId = await getMatchedUserId(account._id);
  if (matchedUserId) {
    return (
      <div className={"text-center"}>
        <SignedIn>
          <h1 className={"text-primary fw-semibold display-1"}>Match Found!</h1>
          <p className={'lead'}>You are matched with {matchedUserId}</p>
        </SignedIn>
      </div>
    );
  }

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

  return (
    <Container>
      <Row className={"g-3"}>
        {
          [user1, user2].map((account, key) => (
            <Col key={key} sm>
              <Form action={async () => {
                'use server';
                // submitPreference(account._id);
              }}>
                <Card>
                  <CardBody>
                    <CardText>{account.generalProfile?.name}</CardText>
                    <SubmitButton className={"w-100"}>Like</SubmitButton>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          ))
        }
      </Row>
    </Container>
  );

}
