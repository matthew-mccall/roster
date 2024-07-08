import { getModelForClass } from '@typegoose/typegoose';
import { Account } from './lib/Account';
import { Roster, RosterEntry } from './lib/Roster';
import { RoommateProfile } from './lib/Profile/RoommateProfile';
import { GeneralProfile } from './lib/Profile/GeneralProfile';
import { DatingProfile } from './lib/Profile/DatingProfile';

export const GeneralProfileModel = getModelForClass(GeneralProfile);
export const RoommateProfileModel = getModelForClass(RoommateProfile);
export const DatingProfileModel = getModelForClass(DatingProfile);
export const AccountModel = getModelForClass(Account)
export const RosterEntryModel = getModelForClass(RosterEntry)
export const RosterModel = getModelForClass(Roster)
