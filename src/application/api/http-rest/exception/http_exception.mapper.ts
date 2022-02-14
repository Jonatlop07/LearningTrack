import { CoreException } from '@core/common/exception/core.exception';
import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';
import { HttpException, HttpStatus } from '@nestjs/common';

type CustomHttpException = {
  mappings: Set<symbol>,
  status_code: HttpStatus,
};

type MappedHttpExceptions = {
  not_found: CustomHttpException,
  bad_request: CustomHttpException,
  conflict: CustomHttpException,
  unauthorized: CustomHttpException,
  forbidden: CustomHttpException
};

export class HttpExceptionMapper {
  private static http_exceptions: MappedHttpExceptions = {
    not_found: {
      mappings: new Set([]),
      status_code: HttpStatus.NOT_FOUND
    },
    bad_request: {
      mappings: new Set([]),
      status_code: HttpStatus.BAD_REQUEST,
    },
    conflict: {
      mappings: new Set([
        CoreExceptionCodes.ACCOUNT_ALREADY_EXISTS,
      ]),
      status_code: HttpStatus.CONFLICT,
    },
    unauthorized: {
      mappings: new Set([]),
      status_code: HttpStatus.UNAUTHORIZED,
    },
    forbidden: {
      mappings: new Set([
        CoreExceptionCodes.INVALID_ACCOUNT_DATA_FORMAT
      ]),
      status_code: HttpStatus.FORBIDDEN,
    },
  };

  private static getHttpException(status: number, error: string): HttpException {
    return new HttpException({
      status,
      error,
    }, status);
  }

  public static toHttpException(exception: CoreException): HttpException {
    if (exception.code) {
      for (const exception_type of Object.keys(this.http_exceptions)) {
        const http_exception_type = exception_type as keyof MappedHttpExceptions;
        if (this.http_exceptions[http_exception_type].mappings.has(exception.code)) {
          return this.getHttpException(
            this.http_exceptions[http_exception_type].status_code,
            exception.message,
          );
        }
      }
    }
    return this.getHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
}

