import { StudyProfile } from '@roster/common';
import StudyProfileQuestionnaire from '../Questionnaires/StudyProfileQuestionnaire';

export default function StudyProfileView({ studyProfile }: { studyProfile?: StudyProfile }) {
  return (<>
    <h1>Study Profile</h1>
    <StudyProfileQuestionnaire studyProfile={studyProfile} />
  </>)
}
