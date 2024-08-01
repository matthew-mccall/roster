'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import {
  AccountModel,
  Guests,
  RosterModel, StudyProfile, StudyProfileModel
} from '@roster/common';
import { revalidatePath } from 'next/cache';

/**
 * Updates the study profile
 * @param formData Data from the form
 * @param pathToRevalidate Path to revalidate
 */
export default async function updateFriendsProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  // get fields
  const formBio = formData.get('formBio') as string;
  const formLocation = formData.get('formLocation') as string;
  const formTopic = formData.get('formTopic') as string;

  if (!formBio || !formLocation || !formTopic) {
    return;
  }

  // get account
  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  // update profile
  if (!account.studyProfile) {
    account.studyProfile = new StudyProfileModel();
    account.studyProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.studyProfile.bio = formBio;
  account.studyProfile.topic = formTopic;
  account.studyProfile.location = formLocation;

  await account.save();

  // revalidate
  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
