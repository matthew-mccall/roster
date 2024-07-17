'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import updateGeneralProfile from '../../actions/updateGeneralProfile';
import SubmitButton from '../SubmitButton';

export default function GeneralProfileQuestionnaire() {
  return (
    <>
      <h1>Let&apos;s get you started...</h1>
      <Form action={updateGeneralProfile}>
        <FormGroup className="mb-3" controlId="formFullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl placeholder="Enter your full name" name="formFullName" />
        </FormGroup>

        <FormGroup className="mb-3" controlId="formGender">
          <FormLabel>Gender Identity</FormLabel>
          <FormSelect aria-label="Default select example" name={"formGender"}>
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Neither</option>
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3" controlId="formInterests">
          <FormLabel>Enter up to 3 of your top hobbies and interests:</FormLabel>
          <FormControl placeholder="Hobby/Interest"  name="formInterest0" />
          <FormControl placeholder="Hobby/Interest"  name="formInterest1" />
          <FormControl placeholder="Hobby/Interest"  name="formInterest2" />
        </FormGroup>
        <FormGroup className="mb-3" controlId="formDislikes">
          <FormLabel>Enter up to 3 of your dislikes:</FormLabel>
          <FormControl placeholder="Dislike"  name="formDislikes0" />
          <FormControl placeholder="Dislike"  name="formDislikes1" />
          <FormControl placeholder="Dislike"  name="formDislikes2" />
        </FormGroup>
        <SubmitButton variant="primary" type="submit">
          Save
        </SubmitButton>
      </Form>
    </>
  )
}
