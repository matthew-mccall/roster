'use client'

import { UserButton as ClerkUserButton, UserProfile } from '@clerk/nextjs';
import GeneralProfileView from '../../../components/Profiles/GeneralProfileView';
import categories from '../../../categories.json';
import RoommateProfileView from '../../../components/Profiles/RoommateProfileView';
import DatingProfileView from '../../../components/Profiles/DatingProfileView';
import useSWR from 'swr';
import fetcher from '../../../fetcher';
import { Spinner, Stack } from 'react-bootstrap';
import { Account } from '@roster/common';
import styles from './page.module.scss'
import Container from 'react-bootstrap/Container';

export default function MePage() {
  const { data, error, isLoading } = useSWR('/api/me', fetcher);

  if (isLoading) {
    return (
      <Stack direction={"horizontal"} className={"justify-content-center"}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Stack>
    );
  }

  if (error) {
    return (
      <Container>
        <h1 className={"text-danger display-1"}>Failed to get your data</h1>
      </Container>
    )
  }

  const { generalProfile, roommateProfile, datingProfile } = data as Account;

  return (
    <Container>
      <UserProfile path={"/me"} appearance={{
        elements: {
          navbar: styles.sidebar,
          scrollBox: 'shadow-none',
          cardBox: 'shadow-none w-100',
          rootBox: 'w-100'
        },
      }} >
        <UserProfile.Page
          label="General Profile"
          url="general"
          labelIcon={<i className="bi-clipboard-fill" />}
        >
          <GeneralProfileView generalProfile={generalProfile} />
        </UserProfile.Page>
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
      </UserProfile>
    </Container>
  )
}
