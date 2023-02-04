import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
const stringHash = require('string-hash');

@Catch(EntityNotFoundError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;
    const code = stringHash(JSON.stringify(message));

    response
      .status(404)
      .json({
        code,
        message,
        problem: 'NOT_FOUND',
        statusCode: 404,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
