'use client';

import { SignedIn } from '@clerk/nextjs';
import LabelledIcon from './LabelledIcon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import categories from '../categories.json';
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  Nav,
  NavLink,
  NavItem,
  NavbarOffcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody
} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import UserButton from './UserButton';

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <Navbar expand="lg" sticky="top" bg={"body"}>
      <Container>
        <Link href="/" passHref legacyBehavior>
          <NavbarBrand>Roster</NavbarBrand>
        </Link>
        <SignedIn>
          <div className={'ms-auto me-2 d-flex d-lg-none'}>
            <UserButton />
          </div>
          <NavbarToggle aria-controls="navbar-nav" />
          <NavbarOffcanvas id="navbar-nav" placement={"end"}>
            <OffcanvasHeader closeButton>
              <OffcanvasTitle>Menu</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
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
              <div className={'align-self-center d-none d-lg-flex'}>
                <UserButton />
              </div>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </SignedIn>
      </Container>
    </Navbar>
  );
}
