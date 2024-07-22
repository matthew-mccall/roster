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
import Image from 'next/image';

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

  async function submitPreference(userID: string, preferredUserID: string) {
    console.log(`Preference submitted: ${preferredUserID} preferred by ${userID}`);
    // Mock ELO calculation
    await calculateElo(userID, preferredUserID);
  }

  async function calculateElo(userID: string, preferredUserID: string) {
    const user = mockProfiles.find(profile => profile._id === userID);
    const preferredUser = mockProfiles.find(profile => profile._id === preferredUserID);

    if (user && preferredUser) {
      const k = 32;
      const expectedScore = 1 / (1 + Math.pow(10, (preferredUser.elo - user.elo) / 400));
      const newElo = user.elo + k * (1 - expectedScore);

      user.elo = newElo;
      console.log(`New ELO for ${user.generalProfile.name}: ${user.elo}`);
    }
  }

  function getUniqueCandidates(candidates: typeof mockProfiles, exclude: string[]): [typeof mockProfiles[0], typeof mockProfiles[0]] {
    const uniqueCandidates = candidates.filter(candidate => !exclude.includes(candidate._id));
    if (uniqueCandidates.length < 2) {
      throw new Error("Not enough unique candidates available");
    }
    
    let user1Ref, user2Ref;
    do {
      user1Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
      user2Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
    } while (user1Ref._id === user2Ref._id);
    
    return [user1Ref, user2Ref];
  }

  const account = await getOrCreateAccount({ required: true });

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

  // Use mock pool
  const pool = { left: mockProfiles.map(profile => profile._id), right: mockProfiles.map(profile => profile._id) };
  const candidates = profile.poolSide === MatchingPoolSide.Left ? pool.right : pool.left;

  const seenProfiles: string[] = []; // Mock seen profiles

  const [user1, user2] = getUniqueCandidates(mockProfiles, seenProfiles);

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
    <Container>
      <Row className="justify-content-center">
        {[user1, user2].map((account, key) => (
          <Col md={4} key={key}>
            <Form
              action={async () => {
                'use server';
                submitPreference(account._id, account._id); // Note: Adjust as needed to pass the correct preferredUserID
              }}
            >
              <Card style={{ width: '100%', height: '500px', marginBottom: '20px', position: 'relative' }}>
                <Image src={account.generalProfile.image} alt={account.generalProfile.name} layout="fill" objectFit="cover" />
                <CardBody className="d-flex flex-column justify-content-end align-items-start" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <CardText style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{account.generalProfile?.name}</CardText>
                  <SubmitButton>Like</SubmitButton>
                </CardBody>
              </Card>
            </Form>
          </Col>
        ))}
      </Row>
    </Container>
  );
}


// export default async function Matching({ params }: { params: { category: string } })
// {

  
//   const categoryRoutes = Object.entries(categories).map(([, value]) => {
//     return value.route
//   })

//   if (!categoryRoutes.includes(params.category)) {
//     notFound()
//   }

//   async function submitPreference(userID: string, preferredUserID: string) {
//     // try to store the preference in the database
//     await MatchingPoolModel.updateOne(
//       { _id: userID },
//       { $push: { preferences: preferredUserID } }
//     );
//     // idk how to calculate ELO lol
//     // await calculateElo(userID, preferredUserID);
//   }
  
//   function getUniqueCandidates(candidates: string[], exclude: string[]): string[] {
//     const uniqueCandidates = candidates.filter(candidate => !exclude.includes(candidate));
//     if (uniqueCandidates.length < 2) {
//       // if not enough unique candidates, return original list
//       return candidates; 
//     }
//     return uniqueCandidates;
//   }
  

//   const account = await getOrCreateAccount({ required: true })

//   if (!account || !account.generalProfile) {
//     return (
//       <Container>
//         <Alert variant={"secondary"}>Please complete the <Link href={"/"} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first</Alert>
//       </Container>
//     )
//   }

//   let profile;
//   let questionnaire;

//   switch (params.category) {
//     case categories.Roommates.route:
//       profile = account.roommateProfile;
//       questionnaire = <RoommateProfileQuestionnaire pathToRevalidate={`/matching/${params.category}`} />
//       break;
//     case categories.Dating.route:
//       profile = account.datingProfile;
//       break;
//   }

//   if (!profile) {
//     return (
//       <Container>
//         <h1>Tell us about yourself...</h1>
//         {questionnaire}
//       </Container>
//     )
//   }

//   let pool;
//   if (!profile.pool) {
//     pool = await MatchingPoolModel.findOne({ type: params.category }).exec();
//     if (!pool) {
//       pool = new MatchingPoolModel({ type: params.category })
//     }
//     profile.pool = pool;
//   } else {
//     pool = (await MatchingPoolModel.findById(profile.pool))!
//   }

//   await account.save();
//   const candidates = profile.poolSide == MatchingPoolSide.Left ? pool.right : pool.left;
//   const uniqueCandidates = getUniqueCandidates(candidates, seenProfiles);

//   const seenProfiles = []; // This should be retrieved from the user's profile
//   // const { user1Ref, user2Ref } = getCandidates(candidates, seenProfiles);
  
//   // const user1Ref = candidates[Math.floor(Math.random() * candidates.length)];
//   // const user2Ref = candidates[Math.floor(Math.random() * candidates.length)];
//   const user1Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];
//   const user2Ref = uniqueCandidates[Math.floor(Math.random() * uniqueCandidates.length)];

//   // TODO: Better solution may be to build a queue and pop people off the queue, to make sure we go through everyone before we repeat
//   const user1 = await AccountModel.findById(user1Ref).exec();
//   const user2 = await AccountModel.findById(user2Ref).exec();

//   if (!user1 || !user2) {
//     return (
//       <div className={"text-center"}>
//         <SignedIn>
//           <h1 className={"text-primary fw-semibold display-1"}>The show&apos;s over</h1>
//           <p className={'lead'}>We ran out of people to show you. Check in later.</p>
//         </SignedIn>
//       </div>
//     )
//   }

//   return (
//     <Stack direction={"horizontal"} gap={3} className={'justify-content-center'}>
//       {
//         [user1, user2].map((account, key) => (
//           <Form action={async () => {
//             'use server'
//             submitPreference(account._id);
//           }} key={key}>
//             <Card>
//               <CardBody>
//                 <CardText>{account.generalProfile?.name}</CardText>
//                 <SubmitButton>Like</SubmitButton>
//               </CardBody>
//             </Card>
//           </Form>
//         ))
//       }
//     </Stack>
//   )

// }