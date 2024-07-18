import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json'
import { notFound } from 'next/navigation';
import { Card, CardBody, Stack } from 'react-bootstrap';
import { Account } from '@roster/common';
import Button from 'react-bootstrap/Button';

export default function Matching({ params }: { params: { category: string } })
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
  }

  return (
    <div className={"text-center"}>
      <SignedIn>
        <h1 className={"text-primary fw-semibold display-1"}>The show&apos;s over</h1>
        <p className={'lead'}>We ran out of people to show you. Check in later.</p>
      </SignedIn>
    </div>
  )
}
