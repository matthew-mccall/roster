import Button from 'react-bootstrap/Button';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import GeneralProfileQuestionnaire from '../components/Questionnaires/GeneralProfileQuestionnaire';
import getOrCreateAccount from '../lib/getOrCreateAccount';
import CategorySelection from '../components/CategorySelection';
import dbConnect from '../db';
import { auth } from '@clerk/nextjs/server';
import { AccountModel } from '@roster/common';
import { Stack } from 'react-bootstrap';

export default async function Index() {
  const mongoose = dbConnect()
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  await mongoose;
  let account = await AccountModel.findById(userId).exec()

  if (userId && !account) {
    account = await AccountModel.create({ _id: userId });
    await account.save()
  }

  return (
    <>
      <SignedOut>
        <div className={'text-center'}>
          <h1 className={'fw-semibold display-1'}>Are <span className={'fst-italic'}>you</span> on the <span
            className={'text-primary'}>Roster</span>?</h1>
          <p className={'lead'}>Looking for roommates, partners, and beyond? Join Roster - the hit new app that
            connects
            you with your perfect match! Don&apos;t miss out, join us today.</p>
          <Stack direction='horizontal' gap={2} className={'justify-content-center'}>
          <SignInButton>
            <Button variant="primary">Sign In</Button>
          </SignInButton>
            or
          <SignUpButton>
            <Button variant="primary">Sign Up</Button>
          </SignUpButton>
          </Stack>
        </div>
      </SignedOut>
      <SignedIn>
        {
          account && account.generalProfile
            ? <CategorySelection />
            : <GeneralProfileQuestionnaire />
        }
      </SignedIn>
    </>
  );
}
