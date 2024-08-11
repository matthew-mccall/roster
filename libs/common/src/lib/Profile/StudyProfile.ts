import { prop } from '@typegoose/typegoose';
import Profile from '.';

export class StudyProfile extends Profile{
  @prop({ required: true, type: String })
  public topic!: string;

  @prop({ required: true, type: String })
  public location!: string;
}
