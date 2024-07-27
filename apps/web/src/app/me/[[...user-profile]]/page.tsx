'use client'

import { UserButton as ClerkUserButton, UserProfile } from '@clerk/nextjs';
import GeneralProfileView from '../../../components/Profiles/GeneralProfileView';
import categories from '../../../categories.json';
import RoommateProfileView from '../../../components/Profiles/RoommateProfileView';
import DatingProfileView from '../../../components/Profiles/DatingProfileView';
import useSWR from 'swr';
import fetcher from '../../../fetcher';
import { Alert, AlertLink, Spinner, Stack } from 'react-bootstrap';
import { Account, FriendsProfile } from '@roster/common';
import styles from './page.module.scss'
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import FriendsProfileView from '../../../components/Profiles/FriendsProfileView';
import StudyProfileView from 'apps/web/src/components/Profiles/StudyProfileView';

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

  const { generalProfile, roommateProfile, datingProfile, friendsProfile, studyProfile } = data as Account;

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
          {generalProfile
            ? <GeneralProfileView generalProfile={generalProfile} />
            : <Alert variant={"secondary"}>Please complete the <Link href={"/"} passHref legacyBehavior><AlertLink>general questionnaire</AlertLink></Link> first</Alert>
          }
        </UserProfile.Page>
        <ClerkUserButton.UserProfilePage
          label={`Roommates Profile`}
          url={categories.Roommates.route}
          labelIcon={<i className={`${categories.Roommates.icon}-fill`} />}
        >
          {roommateProfile
            ? <RoommateProfileView roommateProfile={roommateProfile} />
            : <Alert variant={"secondary"}>Please complete the <Link href={`/matching/${categories.Roommates.route}`} passHref legacyBehavior><AlertLink>roommate questionnaire</AlertLink></Link> first</Alert>
          }        </ClerkUserButton.UserProfilePage>
        <ClerkUserButton.UserProfilePage
          label={`Dating Profile`}
          url={categories.Dating.route}
          labelIcon={<i className={`${categories.Dating.icon}-fill`} />}
        >
          {datingProfile
            ? <DatingProfileView datingProfile={datingProfile} />
            : <Alert variant={"secondary"}>Please complete the <Link href={`/matching/${categories.Dating.route}`} passHref legacyBehavior><AlertLink>dating questionnaire</AlertLink></Link> first</Alert>
          }        </ClerkUserButton.UserProfilePage>
        <ClerkUserButton.UserProfilePage
          label={`Friends Profile`}
          url={categories.Friends.route}
          labelIcon={<i className={`${categories.Friends.icon}-fill`} />}
        >
          {friendsProfile
            ? <FriendsProfileView friendsProfile={friendsProfile} />
            : <Alert variant={"secondary"}>Please complete the <Link href={`/matching/${categories.Friends.route}`} passHref legacyBehavior><AlertLink>friends questionnaire</AlertLink></Link> first</Alert>
          }        </ClerkUserButton.UserProfilePage>
        <ClerkUserButton.UserProfilePage
          label={`Study Profile`}
          url={categories['Study Groups'].route}
          labelIcon={<i className={`${categories['Study Groups'].icon}-fill`} />}
        >
          {studyProfile
            ? <StudyProfileView studyProfile={studyProfile} />
            : <Alert variant={"secondary"}>Please complete the <Link href={`/matching/${categories.Friends.route}`} passHref legacyBehavior><AlertLink>friends questionnaire</AlertLink></Link> first</Alert>
          }        </ClerkUserButton.UserProfilePage>
      </UserProfile>
    </Container>
  )
}
