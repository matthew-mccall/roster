import { FriendsProfile } from '@roster/common';
import FriendsProfileQuestionnaire from '../Questionnaires/FriendsProfileQuestionnaire';

export default function FriendsProfileView({ friendsProfile }: { friendsProfile?: FriendsProfile }) {
  return (<>
    <h1>Friends Profile</h1>
    <FriendsProfileQuestionnaire friendsProfile={friendsProfile} />
  </>)
}
