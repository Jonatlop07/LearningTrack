import { CreateUserAccountDTO } from '@application/api/http-rest/http-dto/user/http_create_user_account.dto';
import CreateUserAccountInputModel from '@core/domain/user/use-case/input_model/create_user_account.input_model';
import CreateUserAccountOutputModel from '@core/domain/user/use-case/output_model/create_user_account.output_model';
import CreateUserAccountResponseDTO
  from '@application/api/http-rest/http-dto/user/http_create_user_account_response.dto';

export class CreateUserAccountMapper {
  public static toInputModel(payload: CreateUserAccountDTO): CreateUserAccountInputModel {
    return {
      email: payload.email,
      password: payload.password,
      username: payload.username
    };
  }

  public static toResponseDTO(payload: CreateUserAccountOutputModel): CreateUserAccountResponseDTO {
    return {
      created_at: payload.created_at
    };
  }
}
