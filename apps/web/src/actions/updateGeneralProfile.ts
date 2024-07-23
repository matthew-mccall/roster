'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, GeneralProfileModel, Guests } from '@roster/common';
import { Gender } from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateGeneralProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formName = formData.get('formFullName') as string
  const formGender = formData.get('formGender')?.valueOf() as Gender
  const formInterests = new Array(0);
  const formDislikes = new Array(0);

  formData.forEach((value, key) => {
    if (key.startsWith("formInterests") && value.length > 0){formInterests.push(value as string)}
    if (key.startsWith("formDislikes") && value.length > 0){formDislikes.push(value as string)}
  });


  if (!formName || !formGender) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  account.generalProfile = new GeneralProfileModel({ name: formName, gender: formGender,
    interests: formInterests, dislikes: formDislikes });
  await account.save();

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate)
  }
}
