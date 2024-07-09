'use client';

import NavigationBarBase from './NavigationBarBase';
import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { IconedNavLink } from '../IconedNavLink';
import { usePathname } from 'next/navigation';

import categories from '../../categories.json';

export default function NavigationBarWithCategory() {
  const pathname = usePathname();

  // For some reason the Navbar component doesn't work
  return (
    <NavigationBarBase>
      <SignedIn>
        {
          Object.entries(categories).map(([key, value]) => (
            <Link href={`/matching/${value.route}`} passHref legacyBehavior key={key}>
              <IconedNavLink className={`nav-link ${pathname === `/matching/${value.route}` ? 'active' : ''}`}
                             aria-current="page" icon={value.icon}>{key}</IconedNavLink>
            </Link>
          ))
        }
      </SignedIn>
    </NavigationBarBase>
  );
}
