'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, Stack } from 'react-bootstrap';
import updateGeneralProfile from '../../actions/updateGeneralProfile';
import SubmitButton from '../SubmitButton';
import { GeneralProfile } from '@roster/common';
import MultiInput from '../MultiInput';

/**
 * Questionnaire to fill in general profile information
 * @param generalProfile General Profile to fill in existing information
 * @param pathToRevalidate Path to revalidate
 * @constructor
 */
export default function GeneralProfileQuestionnaire({ generalProfile, pathToRevalidate }: { generalProfile?: GeneralProfile, pathToRevalidate?: string }) {

  let name, gender;

  if (generalProfile) {
    ({ name, gender } = generalProfile);
  }

  return (
    <Form action={formData => updateGeneralProfile(formData, pathToRevalidate)}>
      <FormGroup className="mb-3" controlId="formFullName">
        <FormLabel>Full Name</FormLabel>
        <FormControl placeholder="Enter your full name" name="formFullName" defaultValue={name} required={true} />
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
      <FormGroup className="mb-3" controlId="formInterests">
        <FormLabel>Hobbies and Interests</FormLabel>
        <MultiInput inputArray={generalProfile?.interests} placeholder={"Hobby/Interest"} name={"formInterests"} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formDislikes">
        <FormLabel>Dislikes</FormLabel>
        <MultiInput inputArray={generalProfile?.dislikes} placeholder={"Dislike"} name={"formDislikes"} />
      </FormGroup>
      <SubmitButton variant="primary" type="submit">
        Save
      </SubmitButton>
    </Form>
  )
}
