import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type AuthUser = {
  sub: string;
};

export const CurrentUser = createParamDecorator<AuthUser>(
  (_: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: AuthUser }>();

    return request.user;
  },
);
