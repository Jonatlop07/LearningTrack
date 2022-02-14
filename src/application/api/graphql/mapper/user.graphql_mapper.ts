import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import { UserGraphqlModel } from '@application/api/graphql/model/user.graphql_model';

export class UserGraphqlMapper {
  public static toUserGraphqlModel(user_dto: UserPersistenceDTO): UserGraphqlModel {
    const { id, email, username, created_at } = user_dto;
    return {
      id,
      email,
      username,
      created_at
    };
  }
}
