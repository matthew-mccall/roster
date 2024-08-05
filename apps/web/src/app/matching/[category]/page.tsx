// 'use client';

// import { useState, useEffect } from 'react';
import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json';
import { notFound } from 'next/navigation';
import { Alert, AlertLink, Card, CardBody, CardText, Form, Row, Col } from 'react-bootstrap';
import { AccountModel, MatchingPoolModel, MatchingPoolSide } from '@roster/common';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';
import SubmitButton from '../../../components/SubmitButton';

const mockProfiles = [
  {
    _id: '1',
    generalProfile: { name: 'Joe Biden', image: '/images/1.png' },
    datingProfile: true,
    elo: 1200
  },
  {
    _id: '2',
    generalProfile: { name: 'Donald Trump', image: '/images/2.png' },
    datingProfile: true,
    elo: 1300
  },
  {
    _id: '3',
    generalProfile: { name: 'Kamala Harris', image: '/images/3.png' },
    datingProfile: true,
    elo: 1100
  },
  {
    _id: '4',
    generalProfile: { name: 'Jimmy Carter', image: '/images/4.png' },
    datingProfile: true,
    elo: 1400
  },
];

export default async function Matching({ params }: { params: { category: string } }) {
  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route;
  });

  if (!categoryRoutes.includes(params.category)) {
    notFound();
  }

  async function submitPreference(userID: string) {
    // TODO: Calculate ELO, update roster entries
  }

  const account = await getOrCreateAccount({ required: true })

  if (!account || !account.generalProfile) {
    return (
      <Container>
        <Alert variant={"secondary"}>
          Please complete the <Link href={"/"} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first
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
      questionnaire = <DatingProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`}  />
      break;
    case categories.Friends.route:
      profile = account.friendsProfile;
      questionnaire = <FriendsProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />
      break;
    case categories['Study Groups'].route:
      profile = account.studyProfile;
      questionnaire = <StudyProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />
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
  if (!profile.pool) {
    pool = await MatchingPoolModel.findOne({ type: params.category }).exec();
    if (!pool) {
      pool = new MatchingPoolModel({ type: params.category })
    }
    profile.pool = pool;
  } else {
    pool = (await MatchingPoolModel.findById(profile.pool))!
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
  const user1 = await AccountModel.findById(user1Ref).exec();
  const user2 = await AccountModel.findById(user2Ref).exec();

  if (!user1 || !user2) {
    return (
      <div className={"text-center"}>
        <SignedIn>
          <h1 className={"text-primary fw-semibold display-1"}>The show's over</h1>
          <p className={'lead'}>We ran out of people to show you. Check in later.</p>
        </SignedIn>
      </div>
    );
  }

  return (
    <Stack direction={"horizontal"} gap={3} className={'justify-content-center'}>
      {
        [user1, user2].map((account, key) => (
          <Form action={async () => {
            'use server'
            submitPreference(account._id);
          }} key={key}>
            <Card>
              <CardBody>
                <CardText>{account.generalProfile?.name}</CardText>
                <SubmitButton>Like</SubmitButton>
              </CardBody>
            </Card>
          </Form>
        ))
      }
    </Stack>
  )

}
