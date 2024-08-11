import { MatchingPool, MatchingPoolSide } from '../MatchingPool';
import { Roster } from '../Roster';
import { type Ref, prop } from '@typegoose/typegoose';

export default abstract class Profile
{
  @prop({ required: true, ref: () => Roster })
  public roster!: Roster

  @prop({ required: true, type: String })
  public bio!: string

  @prop({ ref: () => MatchingPool })
  public pool?: Ref<MatchingPool>

  @prop({ type: Number})
  public poolSide?: MatchingPoolSide
}
