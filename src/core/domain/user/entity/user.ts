import { Entity } from '@core/common/entity/entity';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/create_user_entity_payload';

export class User extends Entity {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _username: string;

  constructor(payload: CreateUserEntityPayload) {
    super();
    const { email, password, username } = payload;
    this._email = email;
    this._password = password;
    this._username = username;
    this._id = payload.id;
  }

  public hasValidAccountData(): boolean {
    return this.hasValidEmail() && this.hasValidUsername() && this.hasValidPassword();
  }

  private hasValidEmail(): boolean {
    return /^[_A-Za-z0-9-\\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
      .test(this._email);
  }

  private hasValidPassword(): boolean {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      .test(this._password);
  }

  private hasValidUsername(): boolean {
    const MAX_NAME_LENGTH = 30;
    return this._username !== '' && this._username.length <= MAX_NAME_LENGTH;
  }
}
