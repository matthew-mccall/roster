import { prop, Ref } from '@typegoose/typegoose';
import { Account } from './Account';

export class MatchingPool
{
  @prop({ required: true })
  public type!: string;

  // @prop({ required: true, ref: () => [Account] })
  // public left!: Ref<Account>[]
  //
  // @prop({ required: true, ref: () => [Account] })
  // public right!: Ref<Account>[]
}
