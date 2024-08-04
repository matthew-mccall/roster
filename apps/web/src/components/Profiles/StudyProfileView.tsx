import { StudyProfile } from '@roster/common';
import StudyProfileQuestionnaire from '../Questionnaires/StudyProfileQuestionnaire';

/**
 * Shows the study profile information
 * @param studyProfile Study Profile for the account
 * @constructor
 */
export default function StudyProfileView({ studyProfile }: { studyProfile?: StudyProfile }) {
  return (<>
    <h1>Study Profile</h1>
    <StudyProfileQuestionnaire studyProfile={studyProfile} />
  </>)
}
