import { RoommateProfile } from '@roster/common';
import RoommateProfileQuestionnaire from '../Questionnaires/RoommateProfileQuestionnaire';

/**
 * Shows the roommate profile
 * @param roommateProfile Roommate profile for the account
 * @constructor
 */
export default function RoommateProfileView({ roommateProfile }: { roommateProfile: RoommateProfile }) {
  return (
    <>
      <h1>Roommate Profile</h1>
      <RoommateProfileQuestionnaire roommateProfile={roommateProfile} />
    </>
  )
}
