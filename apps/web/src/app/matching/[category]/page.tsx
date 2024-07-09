import { SignedIn } from '@clerk/nextjs';
import NavigationBarWithCategoryLayout from '../../../components/NavigationBarWithCategoryLayout';

export default function Matching({ params }: { params: { category: string } })
{
  return (
    <NavigationBarWithCategoryLayout>
      <div className={"text-center"}>
        <SignedIn>
          <h1 className={"text-primary fw-semibold display-1"}>The show&apos;s over</h1>
          <p className={'lead'}>We ran out of people to show you. Check in later.</p>
        </SignedIn>
      </div>
    </NavigationBarWithCategoryLayout>
  )
}
