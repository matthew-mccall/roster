import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json'
import { notFound } from 'next/navigation';
import { Alert, AlertLink, Card, CardBody, Stack } from 'react-bootstrap';
import { Account } from '@roster/common';
import Button from 'react-bootstrap/Button';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import RoommateProfileQuestionnaire from '../../../components/Questionnaires/RoommateProfileQuestionnaire';

export default async function Matching({ params }: { params: { category: string } })
{
  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route
  })

  if (!categoryRoutes.includes(params.category)) {
    notFound()
  }

  let user1: Account, user2: Account;
  // TODO: Fetch two random accounts from matching pool

  async function submitPreference(userID: string) {
    'use server'
    // TODO: Calculate ELO, update roster entries
  }

  const account = await getOrCreateAccount({ required: true })

  if (!account || !account.generalProfile) {
    return (
      <Container>
        <Alert variant={"secondary"}>Please complete the <Link href={"/"} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first</Alert>
      </Container>
    )
  }

  if (params.category === categories.Roommates.route) {
    if (!account.roommateProfile) {
      return (
        <Container>
          <h1>Tell us about yourself...</h1>
          <RoommateProfileQuestionnaire />
        </Container>
      )
    }
  }

  if (!user1 || !user2) {
    return (
      <div className={"text-center"}>
        <SignedIn>
          <h1 className={"text-primary fw-semibold display-1"}>The show&apos;s over</h1>
          <p className={'lead'}>We ran out of people to show you. Check in later.</p>
        </SignedIn>
      </div>
    )
  }

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

}
