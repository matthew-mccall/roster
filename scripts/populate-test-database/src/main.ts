import { AccountModel, Gender, Guests, MatchingPoolModel, RosterModel } from '@roster/common';

async function main() {
  const mark = new AccountModel({ clerkUserId: "mark" });
  mark.generalProfile = {
    name: "Mark",
    gender:
    Gender.Male,
    interests: ["Anonymity"],
    dislikes: ["Being accredited"],
  };
  mark.roommateProfile = {
    bio: "I wrote the second book of the New Testament",
    roster: new RosterModel(),
    preferredBedtime: "08:00",
    guests: Guests.Daily
  };
  await mark.save();

  const matthew = new AccountModel({ clerkUserId: "matthew" });
  matthew.generalProfile = {
    name: 'Matthew',
    gender: Gender.Male,
    interests: new Array<string>('The Gospel'),
    dislikes: ['Not following faith']
  };
  matthew.roommateProfile = {
    bio: 'I wrote the first book of the New Testament',
    roster: new RosterModel(),
    preferredBedtime: '08:00',
    guests: Guests.Daily
  };
  await matthew.save();

  const luke = new AccountModel({ clerkUserId: "luke" });
  luke.generalProfile = { name: 'Luke', gender: Gender.Male, interests: ['Writing'], dislikes: ['Lack of faith'] };
  luke.roommateProfile = {
    bio: 'I wrote the third book of the New Testament',
    roster: new RosterModel(),
    preferredBedtime: '08:00',
    guests: Guests.Daily
  };
  await luke.save();

  const john = new AccountModel({ clerkUserId: "john" });
  john.generalProfile = { name: 'John', gender: Gender.Male, interests: ['Revelations'], dislikes: ['Sin'] };
  john.roommateProfile = {
    bio: 'I wrote the last book of the New Testament',
    roster: new RosterModel(),
    preferredBedtime: '08:00',
    guests: Guests.Daily
  };
  await john.save();

  const matchingPool = new MatchingPoolModel({ type: "roommate", left: [mark._id, matthew._id], right: [luke._id, john._id] });
  await matchingPool.save()
}

main().then()
