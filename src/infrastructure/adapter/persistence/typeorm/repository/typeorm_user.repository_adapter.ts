import { Inject, Injectable, Logger } from '@nestjs/common';
import UserRepository from '@core/domain/user/use-case/repository/user.repository';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import CreateUserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/create_user.persistence_dto';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/user/typeorm_user';
import { TypeOrmUserMapper } from '@infrastructure/adapter/persistence/typeorm/entity/user/mapper/typeorm_user.mapper';
import UserFindPersistenceDTO from '@core/domain/user/use-case/find-persistence-dto/user.find_persistence_dto';
import { getCurrentDate } from '@core/common/util/date/date.util';
import { Optional } from '@core/common/type/common_types';

@Injectable()
export class TypeOrmUserRepositoryAdapter implements UserRepository {
  private readonly logger: Logger = new Logger(TypeOrmUserRepositoryAdapter.name);

  constructor(
    @Inject(TypeOrmDITokens.UserRepository)
    private readonly repository: TypeOrmUserRepository
  ) {}

  public async create(create_user_dto: CreateUserPersistenceDTO): Promise<UserPersistenceDTO> {
    const { email, password, username } = create_user_dto;
    const created_user: TypeOrmUser = await this.repository.save(
      this.repository.create({
        email,
        password,
        username,
        created_at: getCurrentDate()
      })
    );
    return TypeOrmUserMapper.toPersistenceDTO(created_user);
  }

  public async exists(find_details: UserFindPersistenceDTO): Promise<boolean> {
    return !!await this.repository.findOne({
      where: {
        email: find_details.email
      }
    });
  }

  public async findOne(find_details: UserFindPersistenceDTO): Promise<Optional<UserPersistenceDTO>> {
    const user = await this.repository.findOne({
      where: {
        id: find_details.id
      }
    });
    if (user)
      return TypeOrmUserMapper.toPersistenceDTO(user);
    return undefined;
  }
}
