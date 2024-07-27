'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import { DatingProfile, FriendsProfile, StudyProfile } from '@roster/common';
import updateStudyProfile from '../../actions/updateStudyProfile';

export default function StudyProfileQuestionnaire({ studyProfile, pathToRevalidate }: { studyProfile?: StudyProfile, pathToRevalidate?: string }) {
  return (
    <Form action={formData => updateStudyProfile(formData, pathToRevalidate)}>
      <FormGroup className="mb-3" controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} name={"formBio"} defaultValue={studyProfile?.bio /*Destructuring doesn't work on inherited attributes*/} placeholder="Enter your bio..." />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formTopic">
        <FormLabel>Topic or course of study</FormLabel>
        <FormControl name={"formTopic"} defaultValue={studyProfile?.topic} placeholder="Group topic/class" />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formLocation">
        <FormLabel>Location</FormLabel>
        <FormControl name="formLocation" defaultValue={studyProfile?.location} placeholder="Group location (city or school name)" />
      </FormGroup>
      <SubmitButton variant="primary" type="submit">
        Save
      </SubmitButton>
    </Form>
  )
}
