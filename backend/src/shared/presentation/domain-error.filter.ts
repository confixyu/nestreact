import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ConflictError, DomainError, ForbiddenError, NotFoundError, UnauthorizedError } from '../domain/domain.error.js';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(error: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = this.toHttpStatus(error);

    response.status(status).json({
      statusCode: status,
      error: error.name,
      message: error.message,
    });
  }

  private toHttpStatus(error: DomainError): HttpStatus {
    if (error instanceof ConflictError) {
      return HttpStatus.CONFLICT;
    }
    
    if (error instanceof UnauthorizedError) {
        return HttpStatus.UNAUTHORIZED;
    }

    if (error instanceof ForbiddenError) {
        return HttpStatus.FORBIDDEN;
    }

    if (error instanceof NotFoundError) {
        return HttpStatus.NOT_FOUND;
    }
    return HttpStatus.BAD_REQUEST;
  }
}