'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import { RoommateProfile } from '@roster/common';
import updateRoommateProfile from '../../actions/updateRoommateProfile';

/**
 * Questionnaire for roommate profile information
 * @param roommateProfile Roommate profile to fill in account information that already exists
 * @param pathToRevalidate Path the revalidate
 * @constructor
 */
export default function RoommateProfileQuestionnaire({ roommateProfile, pathToRevalidate }: { roommateProfile?: RoommateProfile, pathToRevalidate?: string }) {
  return (
    <Form action={formData => updateRoommateProfile(formData, pathToRevalidate)}>
      <FormGroup className="mb-3" controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} name={"formBio"} required={true} defaultValue={roommateProfile?.bio /*Destructuring doesn't work on inherited attributes*/} placeholder="Enter your bio..." />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formPreferredBedtime">
        <FormLabel>What time do you normally go to sleep?</FormLabel>
        <FormControl name="formPreferredBedtime" type={"time"} required={true} defaultValue={roommateProfile?.preferredBedtime} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formGuests">
        <FormLabel>How often do you like having guests?</FormLabel>
        <FormSelect aria-label="Default select example" name={"formGuests"} required={true} defaultValue={roommateProfile?.guests}>
          <option value={0}>Once a month</option>
          <option value={1}>Once every two weeks</option>
          <option value={2}>Once a week</option>
          <option value={3}>Multiple times per week</option>
          <option value={4}>Daily</option>
        </FormSelect>
      </FormGroup>
      <SubmitButton variant="primary" type="submit">
        Save
      </SubmitButton>
    </Form>
  )
}
