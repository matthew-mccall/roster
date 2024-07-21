import Profile from '.';
import { prop } from '@typegoose/typegoose';

export class RoommateProfile extends Profile {
  @prop({ required: true })
  public preferredBedtime!: string;
}
