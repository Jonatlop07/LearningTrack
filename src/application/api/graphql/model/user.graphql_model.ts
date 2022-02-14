import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user '})
export class UserGraphqlModel {
  @Field(() => ID)
  public id: number;

  @Field()
  public email: string;

  @Field()
  public username: string;

  @Field()
  public created_at: string;
}
