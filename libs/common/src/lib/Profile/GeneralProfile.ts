import { prop } from '@typegoose/typegoose';
import Profile from '.';

enum Gender
{
  Male,
  Female,
  None,
  Other
}

export class GeneralProfile extends Profile
{
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, enum: Gender })
  public gender!: Gender;
}
