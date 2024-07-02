import { Roster } from '../Roster';
import { prop } from '@typegoose/typegoose';

export default class Profile
{
  @prop({ required: true, ref: () => Roster })
  public roster!: Roster
}
