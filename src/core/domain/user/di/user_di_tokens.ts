export class UserDITokens {
  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
  public static readonly CreateUserAccountInteractor: unique symbol = Symbol('CreateUserAccountInteractor');
  public static readonly GetUserAccountDetailsInteractor: unique symbol = Symbol('GetUserAccountDetailsInteractor');
}
