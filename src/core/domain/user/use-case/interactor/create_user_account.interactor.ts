import { Interactor } from '@core/common/use-case/interactor';
import CreateUserAccountInputModel from '@core/domain/user/use-case/input_model/create_user_account.input_model';
import CreateUserAccountOutputModel from '@core/domain/user/use-case/output_model/create_user_account.output_model';

export default interface CreateUserAccountInteractor extends Interactor<CreateUserAccountInputModel, CreateUserAccountOutputModel> {}
