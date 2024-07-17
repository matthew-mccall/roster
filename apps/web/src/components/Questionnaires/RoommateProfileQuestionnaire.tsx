'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import updateRoommateProfile from '../../actions/updateRoommateProfile';

export default function RoommateProfileQuestionnaire() {
  return (
    <>
      <h1>Let&apos;s get you started on finding a roommate...</h1>
      <Form action={updateRoommateProfile}>
        <FormGroup className="mb-3" controlId="formSleepTime">
          <FormLabel>How late do you usually go to sleep?</FormLabel>
          <FormSelect aria-label="Default select example" name={'formSleepTime'}>
            <option value={0}>9 pm or Earlier</option>
            <option value={1}>10 pm</option>
            <option value={2}>11 pm</option>
            <option value={3}>12 am</option>
            <option value={4}>1 am</option>
            <option value={5}>2 am or later</option>
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3" controlId="formGuests">
          <FormLabel>How often do you like having guests?</FormLabel>
          <FormSelect aria-label="Default select example" name={"formGuests"}>
            <option value={0}>Never</option>
            <option value={1}>Rarely</option>
            <option value={2}>Sometimes</option>
            <option value={3}>Often</option>
            <option value={4}>Almost Always</option>
          </FormSelect>
        </FormGroup>
        <SubmitButton variant="primary" type="submit">
          Save
        </SubmitButton>
      </Form>
    </>
  )
}
