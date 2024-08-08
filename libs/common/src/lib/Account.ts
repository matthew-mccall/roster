import { prop } from '@typegoose/typegoose';
import { DatingProfile } from './Profile/DatingProfile';
import { GeneralProfile } from './Profile/GeneralProfile';
import { RoommateProfile } from './Profile/RoommateProfile';
import { FriendsProfile } from './Profile/FriendsProfile';
import { StudyProfile } from './Profile/StudyProfile';

export class Account
{
  @prop({ required: true })
  public clerkUserId!: string;

  @prop({ type: () => GeneralProfile})
  public generalProfile?: GeneralProfile;

  @prop({ type: () => RoommateProfile})
  public roommateProfile?: RoommateProfile;

  @prop({ type: () => DatingProfile})
  public datingProfile?: DatingProfile;

  @prop({ type: () => FriendsProfile })
  public friendsProfile?: FriendsProfile;

  @prop({ type: () => StudyProfile })
  public studyProfile?: StudyProfile;
}
