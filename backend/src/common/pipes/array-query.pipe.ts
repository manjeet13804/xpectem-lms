import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const arrayQueryPipe = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const courseIds = request.query[data];

    if (courseIds instanceof Array) {
      return courseIds;
    }

    return [courseIds]
  },
);
