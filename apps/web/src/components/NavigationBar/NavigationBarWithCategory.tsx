'use client'

import NavigationBarBase from './NavigationBarBase';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { IconedNavLink } from '../IconedNavLink';
import { usePathname } from 'next/navigation';

export default function NavigationBarWithCategory() {
  const pathname = usePathname()

  // For some reason the Navbar component doesn't work
  return (
    <NavigationBarBase>
      <SignedIn>
          <Link href={'/matching/roommates'} passHref legacyBehavior>
            <IconedNavLink className={`nav-link ${pathname === '/matching/roommates' ? 'active' : ''}`} aria-current="page" icon={"bi-building"}>Roommates</IconedNavLink>
          </Link>
          <Link href={"/matching/dating"} passHref legacyBehavior>
            <IconedNavLink className={`nav-link ${pathname === '/matching/dating' ? 'active' : ''}`} aria-current="page" icon={"bi-clipboard-heart"}>Dating</IconedNavLink>
          </Link>
          <Link href={'/matching/friends'} passHref legacyBehavior>
            <IconedNavLink className={`nav-link ${pathname === '/matching/friends' ? 'active' : ''}`} aria-current="page" icon={"bi-people"}>Friends</IconedNavLink>
          </Link>
          <Link href={"/matching/study"} passHref legacyBehavior>
            <IconedNavLink className={`nav-link ${pathname === '/matching/study' ? 'active' : ''}`} aria-current="page" icon={"bi-mortarboard"}>Study Group</IconedNavLink>
          </Link>
      </SignedIn>
    </NavigationBarBase>
  );
}
