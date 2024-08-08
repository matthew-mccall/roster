'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, Guests, RoommateProfileModel, RosterModel } from '@roster/common';
import { revalidatePath } from 'next/cache';

/**
 * Updates the roommate profile
 * @param formData Data from the form
 * @param pathToRevalidate Path to revalidate
 */
export default async function updateRoommateProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  // get fields
  const formGuests = formData.get('formGuests')?.valueOf() as Guests
  const formBio = formData.get('formBio') as string;
  const formPreferredBedtime = (formData.get('formPreferredBedtime') as string)

  if (!formGuests ||!formPreferredBedtime) {
    return;
  }

  // get account
  await mongoose;
  const account = await AccountModel.findOne({ clerkUserId: userId }).exec();

  if (!account) {
    return;
  }

  // update profile
  if (!account.roommateProfile) {
    account.roommateProfile = new RoommateProfileModel();
    account.roommateProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.roommateProfile.bio = formBio;
  account.roommateProfile.preferredBedtime = formPreferredBedtime;
  account.roommateProfile.guests = formGuests;
  await account.save();

  // revalidate
  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
