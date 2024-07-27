import { prop } from '@typegoose/typegoose';
import Profile from '.';

export class FriendsProfile extends Profile {
  @prop({ required: true })
  public activities!: string[]
}
