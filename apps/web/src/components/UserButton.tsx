import GeneralProfile from './Profiles/GeneralProfile';
import categories from '../categories.json';
import RoommateProfile from './Profiles/RoommateProfile';
import DatingProfile from './Profiles/DatingProfile';
import { UserButton as ClerkUserButton } from '@clerk/nextjs';

export default function UserButton()
{
  return (
    <ClerkUserButton>
      <ClerkUserButton.UserProfilePage
        label="General Profile"
        url="general"
        labelIcon={<i className="bi-clipboard-fill" />}
      >
        <GeneralProfile />
      </ClerkUserButton.UserProfilePage>
      <ClerkUserButton.UserProfilePage
        label={`Roommates Profile`}
        url={categories.Roommates.route}
        labelIcon={<i className={`${categories.Roommates.icon}-fill`} />}
      >
        <RoommateProfile />
      </ClerkUserButton.UserProfilePage>
      <ClerkUserButton.UserProfilePage
        label={`Dating Profile`}
        url={categories.Dating.route}
        labelIcon={<i className={`${categories.Dating.icon}-fill`} />}
      >
        <DatingProfile />
      </ClerkUserButton.UserProfilePage>
    </ClerkUserButton>
  )
}
