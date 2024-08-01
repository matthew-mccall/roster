import { GeneralProfile } from '@roster/common';
import GeneralProfileQuestionnaire from '../Questionnaires/GeneralProfileQuestionnaire';

/**
 * Shows the profile's general profile
 * @param generalProfile General Profile for the account
 * @constructor
 */
export default function GeneralProfileView({ generalProfile }: { generalProfile: GeneralProfile }) {
  return (
    <>
      <h1>General Profile</h1>
      <GeneralProfileQuestionnaire generalProfile={generalProfile} />
    </>
  )
}
