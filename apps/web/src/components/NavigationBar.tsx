'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';
import { IconedNavLink } from './IconedNavLink';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import categories from '../categories.json';
import GeneralProfile from './Profiles/GeneralProfile';
import RoommateProfile from './Profiles/RoommateProfile';
import DatingProfile from './Profiles/DatingProfile';

export default function NavigationBar() {
  const pathname = usePathname();

  // For some reason the Navbar component doesn't work
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/">Roster</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <SignedIn>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav nav-underline mx-auto">
              {
                Object.entries(categories).map(([key, value]) => (
                  <Link href={`/matching/${value.route}`} passHref legacyBehavior key={key}>
                    <IconedNavLink className={`nav-link ${pathname === `/matching/${value.route}` ? 'active' : ''}`}
                                   aria-current="page" icon={value.icon}>{key}</IconedNavLink>
                  </Link>
                ))
              }
            </div>
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
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
