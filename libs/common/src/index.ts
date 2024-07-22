import { getModelForClass } from '@typegoose/typegoose';
import { Account } from './lib/Account';
import { Roster, RosterEntry } from './lib/Roster';
import { GeneralProfile } from './lib/Profile/GeneralProfile';
import { RoommateProfile } from './lib/Profile/RoommateProfile';
import { DatingProfile } from './lib/Profile/DatingProfile';
import {Guests} from './Guests';
import { FriendsProfile } from './lib/Profile/FriendsProfile';
import { StudyProfile } from './lib/Profile/StudyProfile';
import { Gender } from './lib/Gender';
import { MatchingPool, MatchingPoolSide } from './lib/MatchingPool';

export { Account, Roster, RosterEntry, GeneralProfile, RoommateProfile, DatingProfile, FriendsProfile, StudyProfile, Gender, Guests, MatchingPool, MatchingPoolSide }

export const GeneralProfileModel = getModelForClass(GeneralProfile);
export const RoommateProfileModel = getModelForClass(RoommateProfile);
export const DatingProfileModel = getModelForClass(DatingProfile);
export const FriendsProfileModel = getModelForClass(FriendsProfile);
export const StudyProfileModel = getModelForClass(StudyProfile);
export const AccountModel = getModelForClass(Account)
export const RosterEntryModel = getModelForClass(RosterEntry)
export const RosterModel = getModelForClass(Roster)
export const MatchingPoolModel = getModelForClass(MatchingPool)
