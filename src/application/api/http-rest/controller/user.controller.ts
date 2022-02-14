import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserDITokens } from '@core/domain/user/di/user_di_tokens';
import CreateUserAccountInteractor from '@core/domain/user/use-case/interactor/create_user_account.interactor';
import { CreateUserAccountDTO } from '@application/api/http-rest/http-dto/user/http_create_user_account.dto';
import CreateUserAccountResponseDTO
  from '@application/api/http-rest/http-dto/user/http_create_user_account_response.dto';
import { CreateUserAccountMapper } from '@application/api/http-rest/http-mapper/user/create_user_account.mapper';
import { HttpExceptionMapper } from '@application/api/http-rest/exception/http_exception.mapper';

@Controller('users')
@ApiTags('user')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor(
    @Inject(UserDITokens.CreateUserAccountInteractor)
    private readonly create_user_account_interactor: CreateUserAccountInteractor
  ) {
  }

  @Post('account')
  @ApiCreatedResponse({
    description: 'User account has been successfully created'
  })
  @ApiForbiddenResponse({ description: 'Invalid sign up data format' })
  @ApiConflictResponse({
    description: 'Tried to create an account that already exists'
  })
  @HttpCode(HttpStatus.CREATED)
  public async createUserAccount(
    @Body(new ValidationPipe()) create_user_account_details: CreateUserAccountDTO
  ): Promise<CreateUserAccountResponseDTO> {
    try {
      return CreateUserAccountMapper.toResponseDTO(
        await this.create_user_account_interactor.execute(
          await CreateUserAccountMapper.toInputModel(
            create_user_account_details
          )
        )
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }
}
