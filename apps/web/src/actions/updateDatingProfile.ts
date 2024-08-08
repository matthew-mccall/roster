'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import {
  AccountModel,
  Guests,
  DatingProfileModel,
  RosterModel,
  SexualOrientation,
  DrinkOccasion, Parties
} from '@roster/common';
import { revalidatePath } from 'next/cache';

/**
 * Updates the dating profile
 * @param formData Data from the form
 * @param pathToRevalidate Path to revalidate
 */
export default async function updateDatingProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  // get fields
  const formBio = formData.get('formBio') as string;
  const formOrientation = formData.get('formOrientation')?.valueOf() as SexualOrientation;
  const formSmoker = formData.get('formSmoker')?.valueOf() as number;
  const formDrinks = formData.get('formDrinks')?.valueOf() as DrinkOccasion;
  const formParties = formData.get('formParties')?.valueOf() as Parties;

  //ensure fields are not blank
  if (!formOrientation || !formSmoker || !formDrinks || !formParties) {
    return;
  }

  // get user account
  await mongoose;
  const account = await AccountModel.findOne({ clerkUserId: userId }).exec();

  if (!account) {
    return;
  }

  if (!account.datingProfile) {
    account.datingProfile = new DatingProfileModel();
    account.datingProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  // save fields
  account.datingProfile.bio = formBio;
  account.datingProfile.sexualOrientation = formOrientation;
  account.datingProfile.smoker = formSmoker;
  account.datingProfile.drinker = formDrinks;
  account.datingProfile.parties = formParties;

  await account.save();

  // revalidate
  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
