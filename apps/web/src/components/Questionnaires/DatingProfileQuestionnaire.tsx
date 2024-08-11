'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import { DatingProfile } from '@roster/common';
import updateDatingProfile from '../../actions/updateDatingProfile';

/**
 * Questionnaire for the user's dating profile
 * @param datingProfile Dating Profile for the account to fill in information for editing
 * @param pathToRevalidate Path to revalidate information
 * @constructor
 */
export default function DatingProfileQuestionnaire({ datingProfile, pathToRevalidate }: { datingProfile?: DatingProfile, pathToRevalidate?: string }) {
  return (
    <Form action={formData => updateDatingProfile(formData, pathToRevalidate)}>
      <FormGroup className="mb-3" controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} name={"formBio"} defaultValue={datingProfile?.bio /*Destructuring doesn't work on inherited attributes*/} required={true} placeholder="Enter your bio..." />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formOrientation">
        <FormLabel>What is your sexual orientation?</FormLabel>
        <FormSelect aria-label="Default select example" name={"formOrientation"} defaultValue={datingProfile?.sexualOrientation} required={true}>
          <option value={0}>Straight/Heterosexual</option>
          <option value={1}>Homosexual</option>
          <option value={2}>Bisexual</option>
        </FormSelect>
      </FormGroup>
      <FormGroup className="mb-3" controlId="formSmoker">
        <FormLabel>Do you smoke or vape?</FormLabel>
        <FormSelect aria-label="Default select example" name={"formSmoker"} defaultValue={datingProfile?.smoker} required={true}>
          <option value={0}>No</option>
          <option value={1}>Yes, smoking only</option>
          <option value={2}>Yes, vaping only</option>
          <option value={3}>Yes, both</option>
        </FormSelect>
      </FormGroup>
      <FormGroup className="mb-3" controlId="formDrinks">
        <FormLabel>How often do you drink?</FormLabel>
        <FormSelect aria-label="Default select example" name={"formDrinks"} defaultValue={datingProfile?.drinker} required={true}>
          <option value={0}>Daily</option>
          <option value={1}>Weekends</option>
          <option value={2}>Only at parties or nights out</option>
          <option value={3}>Only for special occasions</option>
          <option value={4}>Almost Never</option>
        </FormSelect>
      </FormGroup>
      <FormGroup className="mb-3" controlId="formParties">
        <FormLabel>How often do you go out to party?</FormLabel>
        <FormSelect aria-label="Default select example" name={"formParties"} defaultValue={datingProfile?.parties} required={true}>
          <option value={0}>For Special Occasions Only</option>
          <option value={1}>Weekends only</option>
          <option value={2}>A few days a week</option>
          <option value={3}>Weekdays</option>
          <option value={4}>Daily</option>
        </FormSelect>
      </FormGroup>
      <SubmitButton variant="primary" type="submit">
        Save
      </SubmitButton>
    </Form>
  )
}
