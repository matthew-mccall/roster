import VerticalCenter from '../components/VerticalCenter';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import NavigationBarBase from '../components/NavigationBar/NavigationBarBase';
import NavigationBarBaseLayout from '../components/NavigationBarBaseLayout';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <NavigationBarBaseLayout>
      <div className={'text-center'}>
        <SignedOut>
          <h1 className={'fw-semibold display-1'}>Are <span className={'fst-italic'}>you</span> on the <span
            className={'text-primary'}>Roster</span>?</h1>
          <p className={'lead'}>Looking for roommates, partners, and beyond? Join Roster - the hit new app that
            connects
            you with your perfect match! Don&apos;t miss out, join us today.</p>
        </SignedOut>
        <SignedIn>
          <h1 className={'fw-semibold display-1'}>Welcome to the <span
            className={'text-primary'}>Roster</span>!</h1>
          <p className={'lead'}>Looking for roommates, partners, and beyond? Get started!</p>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="primary">Sign In or Sign Up</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href={'/matching'} className={'btn btn-primary'}>Begin matching...</Link>
        </SignedIn>
      </div>
    </NavigationBarBaseLayout>
  );
}
