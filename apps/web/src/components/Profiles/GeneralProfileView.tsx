import { GeneralProfile } from '@roster/common';
import { Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import updateGeneralProfile from '../../actions/updateGeneralProfile';

export default function GeneralProfileView({ generalProfile }: { generalProfile?: GeneralProfile }) {

  if (!generalProfile) {
    return null;
  }

  const {name, gender} = generalProfile
  console.log(generalProfile);

  return (
    <>
      <h1>General Profile</h1>
      <Form action={updateGeneralProfile}>
        <FormGroup className="mb-3" controlId="formFullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl placeholder="Enter your full name" defaultValue={name} name="formFullName" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="formGender">
          <FormLabel>Password</FormLabel>
          <FormSelect aria-label="Default select example" defaultValue={gender} name={"formGender"}>
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Neither</option>
          </FormSelect>
        </FormGroup>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  )
}
