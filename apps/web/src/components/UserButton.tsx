import categories from '../categories.json';

import GeneralProfileView from './Profiles/GeneralProfileView';
import RoommateProfileView from './Profiles/RoommateProfileView';
import DatingProfileView from './Profiles/DatingProfileView';
import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import useSWR from 'swr';
import fetcher from '../fetcher';
import { Account } from '@roster/common';
import { Spinner } from 'react-bootstrap';

export default function UserButton() {
  const { data, error, isLoading } = useSWR('/api/me', fetcher);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <i className={"text-danger bi-exclamation-triangle"} />
    )
  }

  const { generalProfile, roommateProfile, datingProfile } = data as Account;

  return (
    <ClerkUserButton>
      <ClerkUserButton.UserProfilePage
        label="General Profile"
        url="general"
        labelIcon={<i className="bi-clipboard-fill" />}
      >
        <GeneralProfileView generalProfile={generalProfile} />
      </ClerkUserButton.UserProfilePage>
      <ClerkUserButton.UserProfilePage
        label={`Roommates Profile`}
        url={categories.Roommates.route}
        labelIcon={<i className={`${categories.Roommates.icon}-fill`} />}
      >
        <RoommateProfileView roommateProfile={roommateProfile} />
      </ClerkUserButton.UserProfilePage>
      <ClerkUserButton.UserProfilePage
        label={`Dating Profile`}
        url={categories.Dating.route}
        labelIcon={<i className={`${categories.Dating.icon}-fill`} />}
      >
        <DatingProfileView datingProfile={datingProfile} />
      </ClerkUserButton.UserProfilePage>
    </ClerkUserButton>
  );
}
