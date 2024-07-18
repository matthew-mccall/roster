import { prop } from '@typegoose/typegoose';
import { DatingProfile } from './Profile/DatingProfile';
import { GeneralProfile } from './Profile/GeneralProfile';
import { RoommateProfile } from './Profile/RoommateProfile';

export class Account
{
  @prop({ required: true })
  _id!: string;

  @prop({ type: () => GeneralProfile})
  public generalProfile?: GeneralProfile;

  @prop({ type: () => RoommateProfile})
  public roommateProfile?: RoommateProfile;

  @prop({ type: () => DatingProfile})
  public datingProfile?: DatingProfile;
}
