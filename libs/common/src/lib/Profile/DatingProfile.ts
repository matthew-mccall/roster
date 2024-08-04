import Profile from '.';
import { prop } from '@typegoose/typegoose';
import { SexualOrientation } from '../../SexualOrientation';
import { DrinkOccasion } from '../../DrinkOccasion';
import { Parties } from '../../Parties';
import { Expression } from 'mongoose';

export class DatingProfile extends Profile {
  // TODO: replace number with the ENUMs when I figure out what causes the problem
  @prop({ required: true, Type: Number })
  public sexualOrientation!: number; // SexualOrientation

  @prop({ required: true })
  public smoker!: number; // could make enum

  @prop({ required: true, Type: Number })
  public drinker!: number; //DrinkOccasion

  @prop({ required: true, Type: Number })
  public parties!: number; // Parties
}
