import CreateUserAccountGateway from '@core/domain/user/use-case/gateway/create_user_account.gateway';
import GetUserAccountDetailsGateway from '@core/domain/user/use-case/gateway/get_user_account_details.gateway';

export default interface UserRepository
  extends CreateUserAccountGateway, GetUserAccountDetailsGateway {

}
