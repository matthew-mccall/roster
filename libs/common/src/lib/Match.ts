import { prop } from '@typegoose/typegoose';

export class Match
{
  @prop({ required: true, enum: ['roommates', 'dating', 'friend', 'studyGroup'], type: String })
  public type!: 'roommates' | 'dating' | 'friend' | 'studyGroup';

  @prop({ required: true, type: String})
  public user1!: string;

  @prop({ required: true, type: String })
  public user2!: string;
}
