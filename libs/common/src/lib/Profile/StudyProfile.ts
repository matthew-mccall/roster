import { prop } from '@typegoose/typegoose';
import Profile from '.';

export class StudyProfile extends Profile{
  @prop({ required: true })
  public topic!: string;

  @prop({ required: true })
  public location!: string;
}
