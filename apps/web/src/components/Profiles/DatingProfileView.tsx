import { DatingProfile } from '@roster/common';
import DatingProfileQuestionnaire from '../Questionnaires/DatingProfileQuestionnaire';

/**
 * Shows the profile information and allows for editing of a user's profile
 * @param datingProfile Dating profile for the account
 * @constructor
 */
export default function DatingProfileView({ datingProfile }: { datingProfile?: DatingProfile }) {
  return (<>
    <h1>Dating Profile</h1>
    <DatingProfileQuestionnaire datingProfile={datingProfile} />
  </>)
}
