import Button from 'react-bootstrap/Button';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import GeneralProfileQuestionnaire from '../components/Questionnaires/GeneralProfileQuestionnaire';
import getOrCreateAccount from '../lib/getOrCreateAccount';
import CategorySelection from '../components/CategorySelection';

export default async function Index() {
  const account = await getOrCreateAccount();

  return (
    <>
      <SignedOut>
        <div className={'text-center'}>
          <h1 className={'fw-semibold display-1'}>Are <span className={'fst-italic'}>you</span> on the <span
            className={'text-primary'}>Roster</span>?</h1>
          <p className={'lead'}>Looking for roommates, partners, and beyond? Join Roster - the hit new app that
            connects
            you with your perfect match! Don&apos;t miss out, join us today.</p>
          <SignInButton>
            <Button variant="primary">Sign In or Sign Up</Button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        {
          account && account.generalProfile
            ? <CategorySelection />
            :
            <>
              <h1>Let&apos;s get you started...</h1>
              <GeneralProfileQuestionnaire />
            </>
        }
      </SignedIn>
    </>
  );
}
