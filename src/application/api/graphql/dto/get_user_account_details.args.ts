import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUserAccountDetailsArgs {
  @Field(() => Int)
  public user_id: number;
}
