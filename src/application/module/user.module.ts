import { Module, Provider } from '@nestjs/common';
import { UserDITokens } from '@core/domain/user/di/user_di_tokens';
import { CreateUserAccountService } from '@core/service/user/create_user_account.service';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository_adapter';
import { Connection } from 'typeorm';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { GetUserAccountDetailsService } from '@core/service/user/get_user_account_details.service';
import { UserResolver } from '@application/api/graphql/resolver/user.resolver';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import { UserController } from '@application/api/http-rest/controller/user.controller';

const persistence_providers: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (repository) => new TypeOrmUserRepositoryAdapter(repository),
    inject: [TypeOrmDITokens.UserRepository]
  },
  {
    provide: TypeOrmDITokens.UserRepository,
    useFactory: connection => connection.getCustomRepository(TypeOrmUserRepository),
    inject: [Connection]
  }
];

const use_case_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserAccountInteractor,
    useFactory: (gateway) => new CreateUserAccountService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.GetUserAccountDetailsInteractor,
    useFactory: (gateway) => new GetUserAccountDetailsService(gateway),
    inject: [UserDITokens.UserRepository]
  }
];

@Module({
  controllers: [UserController],
  providers: [
    ...persistence_providers,
    ...use_case_providers,
    UserResolver
  ]
})
export class UserModule {}
