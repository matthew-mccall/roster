'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import {
  AccountModel,
  Guests,
  RosterModel, StudyProfile, StudyProfileModel
} from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateFriendsProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formBio = formData.get('formBio') as string;
  const formLocation = formData.get('formLocation') as string;
  const formTopic = formData.get('formTopic') as string;

  if (!formBio || !formLocation || !formTopic) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  if (!account.studyProfile) {
    account.studyProfile = new StudyProfileModel();
    account.studyProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.studyProfile.bio = formBio;
  account.studyProfile.topic = formTopic;
  account.studyProfile.location = formLocation;

  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
