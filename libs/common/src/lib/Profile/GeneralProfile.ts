import { prop } from '@typegoose/typegoose';
import { Gender} from '../../Gender';

export class GeneralProfile
{
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, type: Number })
  public gender!: Gender;

  @prop({ required: true })
  public interests!: string[]

  @prop({ required: true })
  public dislikes!: string[]
}
