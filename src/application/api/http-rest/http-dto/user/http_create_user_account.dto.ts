import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public password: string;
}
