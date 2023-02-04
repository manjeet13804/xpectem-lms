import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserRole } from '../../entity/User';
import * as joi from 'joi';
import { Observable } from 'rxjs';
import {lmsAdminSchema, commonSchema} from "../schemas/lmsAdminSchema";

@Injectable()
export class LmsAdminAccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    const { roles } = user;
    const { body } = request;

    if (roles.includes(UserRole.ADMIN_LMS)) {
      const { error } = joi.validate(body, lmsAdminSchema);

      if (error) {
        throw new ForbiddenException('Forbidden resource');
      }

      return next.handle();
    }

    const { error } = joi.validate(body, commonSchema);

    if (error) {
      throw new ForbiddenException('Forbidden resource');
    }

    return next.handle();
  }
}
