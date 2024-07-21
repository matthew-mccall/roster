'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, RoommateProfileModel, RosterModel } from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateRoommateProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formPreferredBedtime = (formData.get('formPreferredBedtime') as string)

  if (!formPreferredBedtime) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  if (!account.roommateProfile) {
    account.roommateProfile = new RoommateProfileModel();
    account.roommateProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.roommateProfile.preferredBedtime = formPreferredBedtime
  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
