import { DatingProfile } from '@roster/common';
import DatingProfileQuestionnaire from '../Questionnaires/DatingProfileQuestionnaire';

export default function DatingProfileView({ datingProfile }: { datingProfile?: DatingProfile }) {
  return (<>
    <h1>Dating Profile</h1>
    <DatingProfileQuestionnaire datingProfile={datingProfile} />
  </>)
}
