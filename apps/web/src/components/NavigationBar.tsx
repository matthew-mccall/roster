'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';
import LabelledIcon from './LabelledIcon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import categories from '../categories.json';
import GeneralProfile from './Profiles/GeneralProfile';
import RoommateProfile from './Profiles/RoommateProfile';
import DatingProfile from './Profiles/DatingProfile';
import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, Nav, NavLink, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <Navbar expand="lg">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <NavbarBrand>Roster</NavbarBrand>
        </Link>
        <NavbarToggle aria-controls="navbar-nav" />
        <SignedIn>
          <NavbarCollapse id="navbar-nav">
            <Nav variant="underline" className="flex-grow-1 justify-content-center" activeKey={pathname}>
              {
                Object.entries(categories).map(([key, value]) => (
                  <NavItem key={key}>
                    <Link href={`/matching/${value.route}`} passHref legacyBehavior>
                      <NavLink>
                        <LabelledIcon icon={value.icon}>{key}</LabelledIcon>
                      </NavLink>
                    </Link>
                  </NavItem>
                ))
              }
            </Nav>
            <UserButton>
              <UserButton.UserProfilePage
                label="General Profile"
                url="general"
                labelIcon={<i className="bi-clipboard-fill" />}
              >
                <GeneralProfile />
              </UserButton.UserProfilePage>
              <UserButton.UserProfilePage
                label={`Roommates Profile`}
                url={categories.Roommates.route}
                labelIcon={<i className={`${categories.Roommates.icon}-fill`} />}
              >
                <RoommateProfile />
              </UserButton.UserProfilePage>
              <UserButton.UserProfilePage
                label={`Dating Profile`}
                url={categories.Dating.route}
                labelIcon={<i className={`${categories.Dating.icon}-fill`} />}
              >
                <DatingProfile />
              </UserButton.UserProfilePage>
            </UserButton>
          </NavbarCollapse>
        </SignedIn>
      </Container>
    </Navbar>
  );
}
