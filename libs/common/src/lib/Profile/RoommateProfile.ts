import Profile from '.';
import { prop } from '@typegoose/typegoose';
import { Guests } from '../../Guests';
import {SleepTime} from '../../SleepTime';

export class RoommateProfile extends Profile {
  @prop({ required: true, type: Number })
  public sleepTime: SleepTime;

  @prop({ required: true, type: Number })
  public guests!: Guests;
}
