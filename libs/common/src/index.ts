import { getModelForClass } from '@typegoose/typegoose';
import { Account } from './lib/Account';
import { Roster, RosterEntry } from './lib/Roster';
import { GeneralProfile } from './lib/Profile/GeneralProfile';
import { RoommateProfile } from './lib/Profile/RoommateProfile';
import { DatingProfile } from './lib/Profile/DatingProfile';
import { Gender } from './lib/Gender';
import { MatchingPool, MatchingPoolSide } from './lib/MatchingPool';

export { Account, Roster, RosterEntry, GeneralProfile, RoommateProfile, DatingProfile, Gender, MatchingPool, MatchingPoolSide }

export const GeneralProfileModel = getModelForClass(GeneralProfile);
export const RoommateProfileModel = getModelForClass(RoommateProfile);
export const DatingProfileModel = getModelForClass(DatingProfile);
export const AccountModel = getModelForClass(Account)
export const RosterEntryModel = getModelForClass(RosterEntry)
export const RosterModel = getModelForClass(Roster)
export const MatchingPoolModel = getModelForClass(MatchingPool)
