import CreateUserAccountInputModel from '@core/domain/user/use-case/input_model/create_user_account.input_model';
import { User } from '@core/domain/user/entity/user';
import CreateUserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/create_user.persistence_dto';

export class UserMapper {
  public static fromInputToUser(input: CreateUserAccountInputModel): User {
    const { email, password, username } = input;
    return new User({
      email,
      password,
      username,
      id: undefined
    });
  }

  public static fromInputToDTO(input: CreateUserAccountInputModel): CreateUserPersistenceDTO {
    const { email, password, username } = input;
    return {
      email,
      password,
      username
    };
  }
}
