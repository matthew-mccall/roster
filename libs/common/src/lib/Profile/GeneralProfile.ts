import { prop } from '@typegoose/typegoose';
import { Gender} from '../Gender';

export class GeneralProfile
{
  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, type: Number })
  public gender!: Gender;

  @prop({ required: true, type: [String] })
  public interests!: string[]

  @prop({ required: true, type: [String] })
  public dislikes!: string[]
}
