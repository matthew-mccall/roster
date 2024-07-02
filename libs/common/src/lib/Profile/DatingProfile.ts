import { prop } from '@typegoose/typegoose';

enum SexualOrientation {
  Straight,
  Homosexual,
  Bisexual
}

export class DatingProfile {
  @prop({ required: true, enum: SexualOrientation })
  public sexualOrientation!: SexualOrientation
}
