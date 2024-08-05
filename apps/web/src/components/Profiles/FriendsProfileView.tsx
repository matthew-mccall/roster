import { FriendsProfile } from '@roster/common';
import FriendsProfileQuestionnaire from '../Questionnaires/FriendsProfileQuestionnaire';

/**
 * Shows the friend profile
 * @param friendsProfile Friends profile for the account
 * @constructor
 */
export default function FriendsProfileView({ friendsProfile }: { friendsProfile?: FriendsProfile }) {
  return (<>
    <h1>Friends Profile</h1>
    <FriendsProfileQuestionnaire friendsProfile={friendsProfile} />
  </>)
}
