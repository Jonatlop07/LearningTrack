import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserGraphqlModel } from '@application/api/graphql/model/user.graphql_model';
import { GetUserAccountDetailsArgs } from '@application/api/graphql/dto/get_user_account_details.args';
import { Inject } from '@nestjs/common';
import { UserDITokens } from '@core/domain/user/di/user_di_tokens';
import CreateUserAccountInteractor from '@core/domain/user/use-case/interactor/create_user_account.interactor';
import { UserGraphqlMapper } from '@application/api/graphql/mapper/user.graphql_mapper';
import GetUserAccountDetailsInteractor from '@core/domain/user/use-case/interactor/get_user_account_details.interactor';
import GetUserAccountDetailsOutputModel
  from '@core/domain/user/use-case/output_model/get_user_account_details.output_model';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import { Nullable } from '@core/common/type/common_types';

@Resolver(() => UserGraphqlModel)
export class UserResolver {
  constructor(
    @Inject(UserDITokens.CreateUserAccountInteractor)
    private readonly create_user_account: CreateUserAccountInteractor,
    @Inject(UserDITokens.GetUserAccountDetailsInteractor)
    private readonly get_user_account_details: GetUserAccountDetailsInteractor
  ) {}

  @Query(() => UserGraphqlModel)
  public async getUserAccountDetails(@Args() user_args: GetUserAccountDetailsArgs): Promise<Nullable<UserGraphqlModel>> {
    const result: GetUserAccountDetailsOutputModel = await this.get_user_account_details.execute({
      user_id: user_args.user_id
    });
    if (result)
      return UserGraphqlMapper.toUserGraphqlModel(
        result.found_user as UserPersistenceDTO
      );
    return null;
  }
}


