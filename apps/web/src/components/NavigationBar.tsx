import { SignedIn, UserButton } from '@clerk/nextjs';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import IconedButton from './IconedButton';

export default function NavigationBar() {
  // For some reason the Navbar component doesn't work
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">Roster</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <SignedIn>
              <div className="navbar-nav mx-auto">
                <ButtonGroup aria-label="Basic example">
                  <IconedButton icon={"bi-building"} variant="outline-primary">Roomates</IconedButton>
                  <IconedButton icon={"bi-clipboard-heart"} variant="outline-primary">Dating</IconedButton>
                  <IconedButton icon={"bi-people"} variant="outline-primary">Friends</IconedButton>
                  <IconedButton icon={"bi-mortarboard"} variant="outline-primary">Study Group</IconedButton>
                </ButtonGroup>
              </div>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </nav>
  );
}
