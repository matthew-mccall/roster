import { GeneralProfile } from '@roster/common';
import { Alert, Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import updateGeneralProfile from '../../actions/updateGeneralProfile';
import SubmitButton from '../SubmitButton';
import GeneralProfileQuestionnaire from '../Questionnaires/GeneralProfileQuestionnaire';

export default function GeneralProfileView({ generalProfile }: { generalProfile?: GeneralProfile }) {

  if (process.env.NODE_ENV !== 'development') {
    if (!generalProfile) {
      // TODO: Redirect to '/' and display questionnaire
      return (
        <Alert variant="danger" className={"mt-4"}>Failed to get general profile data</Alert>);
    }
  }

  const {name, gender} = generalProfile ?? { name: "", gender: 0 }

  return (
    <>
      <h1>General Profile</h1>
      <p>Current Bug: Have to reload to see updated information</p>
      <Form action={updateGeneralProfile}>
        <FormGroup className="mb-3" controlId="formFullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl placeholder="Enter your full name" defaultValue={name} name="formFullName" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="formGender">
          <FormLabel>Gender Identity</FormLabel>
          <FormSelect aria-label="Default select example" defaultValue={gender} name={"formGender"}>
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Neither</option>
          </FormSelect>
        </FormGroup>
        <SubmitButton variant="primary" type="submit">
          Save
        </SubmitButton>
      </Form>
    </>
  )
}
