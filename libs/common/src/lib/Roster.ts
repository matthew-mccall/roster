import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Account } from './Account';

class RosterEntry
{
  @prop({ required: true, ref: () => Account })
  public account!: Ref<Account>;

  @prop({ required: true })
  public score!: number;
}

export class Roster
{
  @prop({ required: true, type: () => [RosterEntry] })
  public entries!: RosterEntry[];
}

export const RosterModel = getModelForClass(Roster)
