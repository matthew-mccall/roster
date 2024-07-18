import { SignedIn } from '@clerk/nextjs';
import categories from '../../../categories.json'
import { notFound } from 'next/navigation';

export default function Matching({ params }: { params: { category: string } })
{
  const categoryRoutes = Object.entries(categories).map(([, value]) => {
    return value.route
  })

  if (!categoryRoutes.includes(params.category)) {
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
