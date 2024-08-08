import { prop, type Ref } from '@typegoose/typegoose';
import { Account } from './Account';

export class Match
{
  @prop({ required: true, enum: ['roommates', 'dating', 'friend', 'studyGroup'], type: String })
  public type!: 'roommates' | 'dating' | 'friend' | 'studyGroup';

  @prop({ required: true, type: String})
  public user1!: String;

  @prop({ required: true, type: String })
  public user2!: String;
}
