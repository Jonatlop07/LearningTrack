import CreateUserAccountInteractor from '@core/domain/user/use-case/interactor/create_user_account.interactor';
import CreateUserAccountInputModel from '@core/domain/user/use-case/input_model/create_user_account.input_model';
import CreateUserAccountOutputModel from '@core/domain/user/use-case/output_model/create_user_account.output_model';
import { Inject, Logger } from '@nestjs/common';
import { UserDITokens } from '@core/domain/user/di/user_di_tokens';
import CreateUserAccountGateway from '@core/domain/user/use-case/gateway/create_user_account.gateway';
import { UserMapper } from '@core/domain/user/use-case/mapper/user.mapper';
import { User } from '@core/domain/user/entity/user';
import {
  UserAccountAlreadyExistsException,
  UserAccountInvalidDataFormatException
} from '@core/domain/user/use-case/exception/user.exception';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import generateHashedPassword from '@core/common/util/crypto/generate_hashed_password';

export class CreateUserAccountService implements CreateUserAccountInteractor {
  private readonly logger: Logger = new Logger(CreateUserAccountService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: CreateUserAccountGateway
  ) {
  }

  public async execute(input: CreateUserAccountInputModel): Promise<CreateUserAccountOutputModel> {
    const user_to_create: User = UserMapper.fromInputToUser(input);
    if (!user_to_create.hasValidAccountData())
      throw new UserAccountInvalidDataFormatException();
    if (await this.gateway.exists({ email: input.email }))
      throw new UserAccountAlreadyExistsException();
    const created_user: UserPersistenceDTO = await this.gateway.create(UserMapper.fromInputToDTO({
      ...input,
      password: generateHashedPassword(input.password)
    }));
    return {
      created_at: created_user.created_at
    };
  }
}
