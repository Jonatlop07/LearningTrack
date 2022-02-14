import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/user/typeorm_user';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import { fromDateToMomentString } from '@core/common/util/date/moment.util';

export class TypeOrmUserMapper {
  public static toPersistenceDTO(orm_user: TypeOrmUser): UserPersistenceDTO {
    return {
      id: orm_user.id,
      email: orm_user.email,
      password: orm_user.password,
      username: orm_user.username,
      created_at: fromDateToMomentString(orm_user.created_at)
    };
  }
}
