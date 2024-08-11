import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Account, AccountModel, MatchingPool } from '@roster/common';
import { DatingProfile } from '@roster/common';
import { GeneralProfile, GeneralProfileModel } from '@roster/common';
import { MatchingPoolModel, MatchingPoolSide } from '@roster/common';
import { Roster, RosterModel, RosterEntry } from '@roster/common';
import mongoose from 'mongoose';
import {Match,MatchModel} from '@roster/common';

export async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/app', {});
    console.log('Successfully connected to MongoDB');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(col => col.name));

    // Print documents in each collection
    for (const collection of collections) {
      const col = mongoose.connection.db.collection(collection.name);
      const documents = await col.find({}).toArray();
      console.log(`Documents in ${collection.name}:`, documents);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}

function stableMarriage(matchingPool: MatchingPool, accounts: Map<string, Account>) {
  const { left, right } = matchingPool;

  // Create fake matches
  const fakeMatches = new Map<string, string>();

  const leftAccounts = Array.from(left);
  const rightAccounts = Array.from(right);

  for (let i = 0; i < leftAccounts.length; i++) {
    const leftAccountId = leftAccounts[i].toString();
    const rightAccountId = rightAccounts[i % rightAccounts.length].toString();
    fakeMatches.set(leftAccountId, rightAccountId);
  }

  return { matches: fakeMatches };
}
// function stableMarriage(matchingPool: MatchingPool, accounts: Map<string, Account>) {
//   const { left, right } = matchingPool;
//   console.log(matchingPool);
//   console.log(accounts);
//   const leftProposals = new Map<string, number>();
//   const rightPartners = new Map<string, string | null>();
//   const leftEngaged = new Map<string, string | null>();

//   // Initialize proposals and partners
//   for (const leftAccount of left) {
//     const leftAccountId = leftAccount.toString();
//     leftProposals.set(leftAccountId, 0);
//     leftEngaged.set(leftAccountId, null);
//   }
//   for (const rightAccount of right) {
//     const rightAccountId = rightAccount.toString();
//     rightPartners.set(rightAccountId, null);
//   }

//   while (Array.from(leftEngaged.values()).includes(null)) {
//     for (const leftAccount of left) {
//       const leftAccountId = leftAccount.toString();
//       if (leftEngaged.get(leftAccountId) === null) {
//         const leftAccountObj = accounts.get(leftAccountId);
//         if (!leftAccountObj || !leftAccountObj.roommateProfile || !leftAccountObj.roommateProfile.roster) {
//           console.error(`Account ${leftAccountId} has missing roommateProfile or roster.`);
//           continue; // Skip if the profile or roster is missing
//         }

//         const proposalIndex = leftProposals.get(leftAccountId);
//         const rightAccountId = leftAccountObj.roommateProfile.roster.entries[proposalIndex]?.account.toString();

//         if (!rightAccountId) {
//           console.error(`Proposal index ${proposalIndex} is out of bounds for account ${leftAccountId}.`);
//           continue; // Skip if proposal index is out of bounds
//         }

//         if (rightPartners.get(rightAccountId) === null) {
//           rightPartners.set(rightAccountId, leftAccountId);
//           leftEngaged.set(leftAccountId, rightAccountId);
//         } else {
//           const currentPartner = rightPartners.get(rightAccountId);
//           const rightAccountObj = accounts.get(rightAccountId);
//           if (!rightAccountObj || !rightAccountObj.roommateProfile || !rightAccountObj.roommateProfile.roster) {
//             console.error(`Right account ${rightAccountId} has missing roommateProfile or roster.`);
//             continue; // Skip if the profile or roster is missing
//           }

//           const currentPartnerScore = rightAccountObj.roommateProfile.roster.entries.find(entry => entry.account.toString() === currentPartner)?.score || 0;
//           const newPartnerScore = rightAccountObj.roommateProfile.roster.entries.find(entry => entry.account.toString() === leftAccountId)?.score || 0;

//           if (newPartnerScore > currentPartnerScore) {
//             rightPartners.set(rightAccountId, leftAccountId);
//             leftEngaged.set(leftAccountId, rightAccountId);
//             leftEngaged.set(currentPartner, null);
//           }
//         }

//         leftProposals.set(leftAccountId, proposalIndex + 1);
//       }
//     }
//   }

//   return { leftEngaged, rightPartners };
// }


async function main() {
  await connectToDatabase();

  try {
    // Define the categories to process
    const categories = ['roommates', 'dating', 'friends', 'studyGroups'];
  
    // Loop through each category
    for (const category of categories) {
      // Fetch the MatchingPool for the current category from MongoDB
      const matchingPool = await MatchingPoolModel.findOne({ type: category }).exec();
      if (!matchingPool) {
        console.error(`No matching pool found for ${category}`);
        continue;
      }
      console.log(`Matching Pool for ${category}:`, matchingPool);
  
      // Fetch all related accounts
      const accountIds = [...matchingPool.left, ...matchingPool.right];
      const accountDocs = await AccountModel.find({ clerkUserId: { $in: accountIds } }).exec();
  
      // Create a map of account IDs to account documents
      const accounts = new Map();
      for (const account of accountDocs) {
        accounts.set(account.clerkUserId, account);
      }
  
      // Run the Stable Marriage Algorithm for the current category
      const result = stableMarriage(matchingPool, accounts);
      console.log(`Stable Marriage Algorithm Result for ${category}:`, result);
  
      // Save matches to the database
      for (const [leftAccountId, rightAccountId] of result.matches.entries()) {
        const existingMatch = await MatchModel.findOne({
          type: category, // Use the current category
          $or: [
            { user1: leftAccountId, user2: rightAccountId },
            { user1: rightAccountId, user2: leftAccountId }
          ]
        }).exec();
  
        if (!existingMatch) {
          const match = new MatchModel({
            type: category, // Use the current category
            user1: leftAccountId,
            user2: rightAccountId
          });
          await match.save();
        } else {
          console.log(`Match between ${leftAccountId} and ${rightAccountId} already exists in ${category}`);
        }
      }
    }
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    mongoose.disconnect();
  } 
}

// Call the main function
main().catch(console.error);

