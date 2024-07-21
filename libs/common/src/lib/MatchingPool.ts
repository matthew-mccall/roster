import { prop, Ref } from '@typegoose/typegoose';
import { Account } from './Account';

export enum MatchingPoolSide {
  Left,
  Right
}

export class MatchingPool
{
  @prop({ required: true })
  public type!: string;

  @prop({ required: true, ref: () => Account, type: () => String })
  public left!: Ref<Account, string>[]

  @prop({ required: true, ref: () => Account, type: () => String })
  public right!: Ref<Account, string>[]
}
