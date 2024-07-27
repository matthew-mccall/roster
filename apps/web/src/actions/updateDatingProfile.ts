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

export default async function updateDatingProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formBio = formData.get('formBio') as string;
  const formOrientation = formData.get('formOrientation')?.valueOf() as SexualOrientation;
  const formSmoker = formData.get('formSmoker')?.valueOf() as number;
  const formDrinks = formData.get('formDrinks')?.valueOf() as DrinkOccasion;
  const formParties = formData.get('formParties')?.valueOf() as Parties;

  if (!formOrientation || !formSmoker || !formDrinks || !formParties) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  if (!account.datingProfile) {
    account.datingProfile = new DatingProfileModel();
    account.datingProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.datingProfile.bio = formBio;
  account.datingProfile.sexualOrientation = formOrientation;
  account.datingProfile.smoker = formSmoker;
  account.datingProfile.drinker = formDrinks;
  account.datingProfile.parties = formParties;

  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
