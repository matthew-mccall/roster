'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import {
  AccountModel,
  RosterModel, FriendsProfileModel
} from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateFriendsProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formBio = formData.get('formBio') as string;
  const formActivities = new Array(0);
  formData.forEach((value, key) => {
    if (key.startsWith("formActivities") && value.length > 0){formActivities.push(value as string)}
  });

  if (!formBio) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  if (!account.friendsProfile) {
    account.friendsProfile = new FriendsProfileModel();
    account.friendsProfile.roster = new RosterModel();
    // const matchingPool = await MatchingPoolModel.findOne({ type: 'roommate' }).exec();
  }

  account.friendsProfile.bio = formBio;
  account.friendsProfile.activities = formActivities;

  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
