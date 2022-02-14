import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';
import { CoreException } from '@core/common/exception/core.exception';

abstract class UserException extends CoreException {}

class UserAccountInvalidDataFormatException extends UserException {
  code = CoreExceptionCodes.INVALID_ACCOUNT_DATA_FORMAT;
  message = 'Invalid account data format';
}

class UserAccountAlreadyExistsException extends UserException {
  code = CoreExceptionCodes.ACCOUNT_ALREADY_EXISTS;
  message = 'Tried to create an account that already exists';
}

export {
  UserAccountInvalidDataFormatException,
  UserAccountAlreadyExistsException
};

