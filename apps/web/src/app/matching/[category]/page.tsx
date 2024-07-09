'use client'

import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json'
import { notFound, usePathname } from 'next/navigation';

export default function Matching({ params }: { params: { category: string } })
{
  const categoryRoutes = Object.entries(categories).map(([key, value]) => {
    return `/matching/${value.route}`
  })

  const pathname = usePathname();

  if (!categoryRoutes.includes(pathname)) {
    notFound()
  }

  return (
    <div className={"text-center"}>
      <SignedIn>
        <h1 className={"text-primary fw-semibold display-1"}>The show&apos;s over</h1>
        <p className={'lead'}>We ran out of people to show you. Check in later.</p>
      </SignedIn>
    </div>
  )
}
