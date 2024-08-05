import { prop, type Ref } from '@typegoose/typegoose';
import { Account } from './Account';

export class RosterEntry
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
