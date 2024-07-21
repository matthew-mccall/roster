import { MatchingPool } from '../MatchingPool';
import { Roster } from '../Roster';
import { Ref, prop } from '@typegoose/typegoose';

export default abstract class Profile
{
  @prop({ required: true, ref: () => Roster })
  public roster!: Roster

  @prop({ ref: () => MatchingPool })
  public pool?: Ref<MatchingPool>

  @prop({ required: true })
  public bio!: string
}
