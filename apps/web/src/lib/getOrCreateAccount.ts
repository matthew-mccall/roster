import { auth } from '@clerk/nextjs/server';
import { AccountModel } from '@roster/common';
import dbConnect from '../db';

export default async function getOrCreateAccount(args?: { required?: boolean }) {
  const mongoose = dbConnect();
  // Get the userId from auth() -- if null, the user is not signed in

  let userId;
  if (!args || !args.required) {
    ({ userId } = auth());
    if (!userId) return;
  }

  ({ userId } = auth().protect());

  await mongoose;
  let account = await AccountModel.findOne({ clerkUserId: userId }).exec();

  if (!account) {
    account = await AccountModel.create({ clerkUserId: userId });
    await account.save();
  }

  return account;
}
