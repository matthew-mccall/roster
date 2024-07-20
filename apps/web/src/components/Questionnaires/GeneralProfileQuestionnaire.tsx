import { Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import updateGeneralProfile from '../../actions/updateGeneralProfile';
import SubmitButton from '../SubmitButton';
import { GeneralProfile } from '@roster/common';

export default function GeneralProfileQuestionnaire({ generalProfile }: { generalProfile?: GeneralProfile }) {

  let name, gender;

  if (generalProfile) {
    ({ name, gender } = generalProfile);
  }

  return (
    <Form action={updateGeneralProfile}>
      <FormGroup className="mb-3" controlId="formFullName">
        <FormLabel>Full Name</FormLabel>
        <FormControl placeholder="Enter your full name" name="formFullName" defaultValue={name} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formGender">
        <FormLabel>Gender</FormLabel>
        <FormSelect aria-label="Default select example" name={"formGender"} defaultValue={gender}>
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
  )
}
