import { AccountModel, MatchModel } from '@roster/common';
import { SignedIn } from '@clerk/nextjs';
import { Card, CardBody, CardText } from 'react-bootstrap';
import { createClerkClient } from '@clerk/backend';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';

export default async function Matches({ params }: { params: { category: string } })
{
  const account = await getOrCreateAccount({ required: true })

  if (!account) {
    return;
  }

  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

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

  async function getUserEmail(clerkUserId: string): Promise<string | null> {
    try {
      const response = await clerkClient.users.getUser(clerkUserId);
      // console.log(response)
      return response.emailAddresses[0].emailAddress;
    } catch (error) {
      console.error('Error fetching user email from Clerk:', error);
      return null;
    }
  }

  const matchedUserId = await getMatchedUserId(account.clerkUserId);
  const matchedUserAccount = await AccountModel.findOne({clerkUserId: matchedUserId});
  if (matchedUserId) {
    const user1Email = await getUserEmail(account.clerkUserId);
    const user2Email = await getUserEmail(matchedUserId);
    if (user1Email && user2Email) {
      // await sendEmailToUsers(user1Email, user2Email);
    }
    return (
      <div className={"text-center"}>
        <SignedIn>
          <h1 className={"text-primary fw-semibold display-1"}>Match Found!</h1>
          <p className={'lead'}>You are matched with {matchedUserAccount?.generalProfile!.name}!</p>
          <p className={'lead'}>Contact email: {getUserEmail(matchedUserId)} </p>
          <Card style={{ width: '30%', height: '500px', margin: '20px auto', position: 'relative' }}>
            {/* <Image src={account.generalProfile?.image || '/default.png'} alt={account.generalProfile?.name} layout="fill" objectFit="cover" /> */}
            <CardBody className="d-flex flex-column justify-content-end align-items-start" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <CardText style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{matchedUserAccount?.generalProfile?.name}</CardText>
              <CardText style={{ fontSize: '1rem', color: 'white' }}>
                Gender: {(() => {
                const gender = account.generalProfile?.gender;
                if (gender === 0) {
                  return "Male";
                } else if (gender === 1) {
                  return "Female";
                } else if (gender === 2) {
                  return "Non-Binary";
                } else {
                  return "Other";
                }
              })()}
              </CardText>
              <CardText style={{ fontSize: '1rem', color: 'white' }}>Interests: {matchedUserAccount?.generalProfile?.interests.join(', ')}</CardText>
              <CardText style={{ fontSize: '1rem', color: 'white' }}>Dislikes: {matchedUserAccount?.generalProfile?.dislikes.join(', ')}</CardText>
              {account.roommateProfile && (
                <>
                  {/* <CardText style={{ fontSize: '1rem', color: 'white' }}>Roommate Profile Details</CardText> */}
                  {/* Add additional RoommateProfile attributes here */}
                </>
              )}
            </CardBody>
          </Card>
        </SignedIn>
      </div>
    );
  }
}
