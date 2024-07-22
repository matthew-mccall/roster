import { prop } from '@typegoose/typegoose';
import Profile from './index';

enum SexualOrientation {
  Straight,
  Homosexual,
  Bisexual
}

export class DatingProfile extends Profile {
  @prop({ required: true, enum: SexualOrientation })
  public sexualOrientation!: SexualOrientation
}