import { GeneralProfile } from '@roster/common';
import GeneralProfileQuestionnaire from '../Questionnaires/GeneralProfileQuestionnaire';

export default function GeneralProfileView({ generalProfile }: { generalProfile: GeneralProfile }) {
  return (
    <>
      <h1>General Profile</h1>
      <GeneralProfileQuestionnaire generalProfile={generalProfile} />
    </>
  )
}
