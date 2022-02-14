import { Interactor } from '@core/common/use-case/interactor';
import GetUserAccountDetailsInputModel
  from '@core/domain/user/use-case/input_model/get_user_account_details.input_model';
import GetUserAccountDetailsOutputModel
  from '@core/domain/user/use-case/output_model/get_user_account_details.output_model';

export default interface GetUserAccountDetailsInteractor
  extends Interactor<GetUserAccountDetailsInputModel, GetUserAccountDetailsOutputModel> {}
