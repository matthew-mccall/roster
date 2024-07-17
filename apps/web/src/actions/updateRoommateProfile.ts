'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, Guests, RoommateProfileModel, Roster, RosterModel, SleepTime } from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateRoommateProfile(formData: FormData)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formGuests = formData.get('formGuests')?.valueOf() as Guests
  const formSleepTime = formData.get('formSleepTime')?.valueOf() as SleepTime

  if (!formGuests || !formSleepTime) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  const roster = new RosterModel(); // GET FROM SERVER

  console.log(formData)

  account.roommateProfile = new RoommateProfileModel({ guests: formGuests, sleepTime: formSleepTime, roster: roster });
  // account.roommateProfile.roster = roster;
  await account.save();

  revalidatePath('/')
}
