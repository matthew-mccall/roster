import Profile from '.';
import { prop } from '@typegoose/typegoose';
import { SexualOrientation } from '../../SexualOrientation';
import { DrinkOccasion } from '../../DrinkOccasion';
import { Parties } from '../../Parties';

export class DatingProfile extends Profile {
  // TODO: replace number with the ENUMs when I figure out what causes the problem
  @prop({ required: true, type: Number })
  public sexualOrientation!: SexualOrientation; // SexualOrientation

  @prop({ required: true, type: Number })
  public smoker!: number; // could make enum

  @prop({ required: true, type: Number })
  public drinker!: DrinkOccasion; //DrinkOccasion

  @prop({ required: true, type: Number })
  public parties!: Parties; // Parties
}
