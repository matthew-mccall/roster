'use server'

import { auth } from '@clerk/nextjs/server';
import dbConnect from '../db';
import { AccountModel, GeneralProfileModel } from '@roster/common';
import { Gender } from '@roster/common';

export default async function updateGeneralProfile(formData: FormData)
{
  const mongoose = dbConnect();
  const { userId } = auth().protect();

  const formName = formData.get('formFullName') as string
  const formGender = formData.get('formGender')?.valueOf() as Gender

  if (!formName || !formGender) {
    return;
  }

  await mongoose;
  const account = await AccountModel.findById(userId).exec();

  if (!account) {
    return;
  }

  account.generalProfile = new GeneralProfileModel({ name: formName, gender: formGender });
  await account.save();
}
