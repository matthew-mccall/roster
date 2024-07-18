'use client'

import { Form, FormControl, FormGroup, FormLabel, FormSelect, Stack } from 'react-bootstrap';
import updateGeneralProfile from '../../actions/updateGeneralProfile';
import SubmitButton from '../SubmitButton';
import { GeneralProfile } from '@roster/common';

export default function GeneralProfileQuestionnaire({ generalProfile }: { generalProfile?: GeneralProfile }) {

  let name, gender;

  if (generalProfile) {
    ({ name, gender} = generalProfile);
  }

  return (
    <>
      <Form action={updateGeneralProfile}>
        <FormGroup className="mb-3" controlId="formFullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl placeholder="Enter your full name" name="formFullName" defaultValue={name} />
        </FormGroup>

        <FormGroup className="mb-3" controlId="formGender">
          <FormLabel>Gender Identity</FormLabel>
          <FormSelect aria-label="Default select example" name={"formGender"} defaultValue={gender} >
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Neither</option>
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3" controlId="formInterests">
          <FormLabel>Enter up to 3 of your top hobbies and interests:</FormLabel>
          <Stack gap={2}>
            <FormControl placeholder="Hobby/Interest"
                         defaultValue={generalProfile && generalProfile.interests.length > 0 ? generalProfile.interests[0]: ""}
                         name="formInterest0" />
            <FormControl placeholder="Hobby/Interest"
                         defaultValue={generalProfile && generalProfile.interests.length > 1 ? generalProfile.interests[1]: ""}
                         name="formInterest1" />
            <FormControl placeholder="Hobby/Interest"
                         defaultValue={generalProfile && generalProfile.interests.length > 2 ? generalProfile.interests[2]: ""}
                         name="formInterest2" />
          </Stack>
        </FormGroup>
        <FormGroup className="mb-3" controlId="formDislikes">
          <FormLabel>Enter up to 3 of your dislikes:</FormLabel>
          <Stack gap={2}>
            <FormControl placeholder="Dislike"
                         defaultValue={generalProfile && generalProfile.dislikes.length > 0 ? generalProfile.dislikes[0]: ""}
                         name="formDislikes0" />
            <FormControl placeholder="Dislike"
                         defaultValue={generalProfile && generalProfile.dislikes.length > 1 ? generalProfile.dislikes[1]: ""}
                         name="formDislikes1" />
            <FormControl placeholder="Dislike"
                         defaultValue={generalProfile && generalProfile.dislikes.length > 2 ? generalProfile.dislikes[2]: ""}
                         name="formDislikes2" />
          </Stack>
        </FormGroup>
        <SubmitButton variant="primary" type="submit">
          Save
        </SubmitButton>
      </Form>
    </>
  )
}
