import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json'
import { notFound } from 'next/navigation';
import { Card, CardBody, Stack } from 'react-bootstrap';
import { Account } from '@roster/common';
import Button from 'react-bootstrap/Button';
import dbConnect from '../../../db';
import { auth } from '@clerk/nextjs/server';
import { AccountModel } from '@roster/common';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';

export default async function Matching({ params }: { params: { category: string } })
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route
  })

  if (!categoryRoutes.includes(params.category)) {
    notFound()
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  if (params.category === "roommates" && !account.roommateProfile) {
    return (<RoommateProfileQuestionnaire />);
  }

  if (params.category === "dating" && !account.datingProfile) {
    return (<p>No Questionnaire or Profile Available (Dating)</p>);
  }

  if (params.category === "friends" && !account.friendsProfile) {
    return (<p>No Questionnaire or Profile Available (Friends)</p>);
  }

  if (params.category === "study" && !account.studyProfile) {
    return (<p>No Questionnaire or Profile Available (Study Group)</p>);
  }

  let user1: Account, user2: Account;
  // TODO: Fetch two random accounts from matching pool

  async function submitPreference(userID: string) {
    'use server'
    // TODO: Calculate ELO, update roster entries
  }

  if (user1 && user2) {
    return (
      <Stack direction={"horizontal"} gap={3} className={'justify-content-center'}>
        {
          [user1, user2].map((account, key) => (
            <Card key={key}>
              <CardBody>
                <Button onClick={() => submitPreference(account._id)}>Like</Button>
              </CardBody>
            </Card>
          ))
        }
      </Stack>
    )
  } else {
    return (<div className={'text-center'}>
      <SignedIn>
        <h1 className={'text-primary fw-semibold display-1'}>The show&apos;s over</h1>
        <p className={'lead'}>We ran out of people to show you. Check in later.</p>
      </SignedIn>
    </div>)
  }
}
