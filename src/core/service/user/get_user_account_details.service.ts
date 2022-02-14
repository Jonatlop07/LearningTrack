import GetUserAccountDetailsInteractor from '@core/domain/user/use-case/interactor/get_user_account_details.interactor';
import { Inject, Logger } from '@nestjs/common';
import GetUserAccountDetailsInputModel
  from '@core/domain/user/use-case/input_model/get_user_account_details.input_model';
import GetUserAccountDetailsOutputModel
  from '@core/domain/user/use-case/output_model/get_user_account_details.output_model';
import { UserDITokens } from '@core/domain/user/di/user_di_tokens';
import GetUserAccountDetailsGateway from '@core/domain/user/use-case/gateway/get_user_account_details.gateway';

export class GetUserAccountDetailsService implements GetUserAccountDetailsInteractor {
  private readonly logger: Logger = new Logger(GetUserAccountDetailsService.name);

  constructor(
    @Inject(UserDITokens.GetUserAccountDetailsInteractor)
    private readonly gateway: GetUserAccountDetailsGateway
  ) {}

  public async execute(input: GetUserAccountDetailsInputModel): Promise<GetUserAccountDetailsOutputModel> {
    return {
      found_user: await this.gateway.findOne({
        id: input.user_id
      })
    };
  }
}
