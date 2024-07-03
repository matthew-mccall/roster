import styles from './page.module.scss';
import VerticalCenter from '../components/VerticalCenter';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={"flex-grow-1"}>
      <VerticalCenter>
        <Container>
          <div className={"text-center"}>
            <SignedOut>
              <h1 className={"fw-semibold display-1"}>Are <span className={"fst-italic"}>you</span> on the <span className={"text-primary"}>Roster</span>?</h1>
              <p className={'lead'}>Looking for roommates, partners, and beyond? Join Roster - the hit new app that connects
                you with your perfect match! Don't miss out, join us today.</p>
              <SignInButton>
                <Button variant="primary">Sign In or Sign Up</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <h1 className={"text-primary fw-semibold display-1"}>The show's over</h1>
              <p className={'lead'}>We've ran out of people to show you. Check in later.</p>
            </SignedIn>
          </div>
        </Container>
      </VerticalCenter>
    </div>
  );
}
