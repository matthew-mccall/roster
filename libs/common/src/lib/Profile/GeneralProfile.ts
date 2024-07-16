import { prop } from '@typegoose/typegoose';
import { Gender} from '../../Gender';

export class GeneralProfile
{
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, enum: Gender })
  public gender!: Gender;
}
