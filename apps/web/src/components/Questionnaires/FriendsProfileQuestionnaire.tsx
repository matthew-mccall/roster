'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import { DatingProfile, FriendsProfile } from '@roster/common';
import updateFriendsProfile from '../../actions/updateFriendsProfile';
import MultiInput from '../MultiInput';

export default function FriendsProfileQuestionnaire({ friendsProfile, pathToRevalidate }: { friendsProfile?: FriendsProfile, pathToRevalidate?: string }) {
  return (
    <Form action={formData => updateFriendsProfile(formData, pathToRevalidate)}>
      <FormGroup className="mb-3" controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} name={"formBio"} defaultValue={friendsProfile?.bio /*Destructuring doesn't work on inherited attributes*/} placeholder="Enter your bio..." />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formActivities">
        <FormLabel>What are some activities you enjoy?</FormLabel>
        <MultiInput inputArray={friendsProfile?.activities} placeholder={"Activity"} name={"formActivities"} />
      </FormGroup>
      <SubmitButton variant="primary" type="submit">
        Save
      </SubmitButton>
    </Form>
  )
}
