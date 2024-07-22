'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, Guests, RoommateProfileModel, RosterModel } from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateRoommateProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formGuests = formData.get('formGuests')?.valueOf() as Guests
  const formBio = formData.get('formBio') as string;
  const formPreferredBedtime = (formData.get('formPreferredBedtime') as string)

  if (!formGuests ||!formPreferredBedtime) {
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

  account.roommateProfile.bio = formBio;
  account.roommateProfile.preferredBedtime = formPreferredBedtime;
  account.roommateProfile.guests = formGuests;
  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
