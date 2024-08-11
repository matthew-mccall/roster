import Profile from '.';
import { prop } from '@typegoose/typegoose';
import { Guests } from '../../Guests';

export class RoommateProfile extends Profile {
  @prop({ required: true, type: String })
  public preferredBedtime!: string;

  @prop({ required: true, type: Number })
  public guests!: Guests;
}
