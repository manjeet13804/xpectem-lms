import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { isHasProblem } from '../exceptions/has-problem.interface';
const stringHash = require('string-hash');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const { error, message = error, errors } = exception.message;
    const code = stringHash(JSON.stringify(message || 'Something went wrong'));
    const problem = isHasProblem(exception) && exception.problem || null;

    response
      .status(status)
      .json({
        code,
        error,
        message,
        problem,
        errors,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
