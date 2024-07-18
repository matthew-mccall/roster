import { GeneralProfile } from '@roster/common';
import { Alert } from 'react-bootstrap';
import GeneralProfileQuestionnaire from '../Questionnaires/GeneralProfileQuestionnaire';

export default function GeneralProfileView({ generalProfile }: { generalProfile?: GeneralProfile }) {

  if (process.env.NODE_ENV !== 'development') {
    if (!generalProfile) {
      // TODO: Redirect to '/' and display questionnaire
      return (
        <Alert variant="danger" className={"mt-4"}>Failed to get general profile data</Alert>);
    }
  }

  generalProfile = generalProfile ?? { name: "John Doe", gender: 3 }

  return (
    <>
      <h1>General Profile</h1>
      <GeneralProfileQuestionnaire generalProfile={generalProfile} />
    </>
  )
}
