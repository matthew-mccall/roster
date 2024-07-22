'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, GeneralProfileModel } from '@roster/common';
import { Gender } from '@roster/common';
import { revalidatePath } from 'next/cache';

export default async function updateGeneralProfile(formData: FormData, pathToRevalidate? : string)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formName = formData.get('formFullName') as string
  const formGender = formData.get('formGender')?.valueOf() as Gender
  const formInterests = new Array(3);
  const formDislikes = new Array(3);
  let i = 0;
  formInterests[i] = formData.get("formInterest0")?.valueOf() as string;
  if ((formData.get("formInterest0")?.valueOf() as string).length > 0) i = i+1;
  formInterests[i] = formData.get("formInterest1")?.valueOf() as string;
  if ((formData.get("formInterest1")?.valueOf() as string).length > 0) i = i+1;
  formInterests[i] = formData.get("formInterest2")?.valueOf() as string;
  if ((formData.get("formInterest2")?.valueOf() as string).length > 0) i = i+1;

  i = 0;
  formDislikes[i] = formData.get("formDislikes0")?.valueOf() as string;
  if ((formData.get("formDislikes0")?.valueOf() as string).length > 0) i = i+1;
  formDislikes[i] = formData.get("formDislikes1")?.valueOf() as string;
  if ((formData.get("formDislikes1")?.valueOf() as string).length > 0) i = i+1;
  formDislikes[i] = formData.get("formDislikes2")?.valueOf() as string;
  if ((formData.get("formDislikes2")?.valueOf() as string).length > 0) i = i+1;

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
