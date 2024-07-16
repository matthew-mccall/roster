import { auth } from "@clerk/nextjs/server";
import { AccountModel } from '@roster/common';
import dbConnect from '../db';
export default async function getOrCreateAccount() {
    const mongoose = dbConnect()
    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = auth().protect();

    await mongoose;
    let account = await AccountModel.findById(userId).exec()

    if (!account) {
      account = await AccountModel.create({ _id: userId });
      await account.save()
    }

    return account;
}
