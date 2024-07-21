import { RoommateProfile } from '@roster/common';
import RoommateProfileQuestionnaire from '../Questionnaires/RoommateProfileQuestionnaire';

export default function RoommateProfileView({ roommateProfile }: { roommateProfile: RoommateProfile }) {
  return (
    <>
      <h1>Roommate Profile</h1>
      <RoommateProfileQuestionnaire roommateProfile={roommateProfile} />
    </>
  )
}
