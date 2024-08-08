'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, GeneralProfileModel, Guests } from '@roster/common';
import { Gender } from '@roster/common';
import { revalidatePath } from 'next/cache';
import getOrCreateAccount from '../lib/getOrCreateAccount';

/**
 * Updates the general profile
 * @param formData Data from the form
 * @param pathToRevalidate Path to revalidate
 */
export default async function updateGeneralProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = await dbConnect();
  const account = await getOrCreateAccount({ required: true })

  if (!account) {
    throw new Error('You must be signed in to perform this action')
  }
  // get fields
  const formName = formData.get('formFullName') as string
  const formGender = formData.get('formGender')?.valueOf() as Gender
  const formInterests = new Array(0);
  const formDislikes = new Array(0);

  // get multi-input fields
  formData.forEach((value, key) => {
    if (key.startsWith("formInterests") && value.length > 0){formInterests.push(value as string)}
    if (key.startsWith("formDislikes") && value.length > 0){formDislikes.push(value as string)}
  });


  if (!formName || !formGender) {
    return;
  }

  // update profile
  account.generalProfile = new GeneralProfileModel({ name: formName, gender: formGender,
    interests: formInterests, dislikes: formDislikes });
  await account.save();

  // revalidate
  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
