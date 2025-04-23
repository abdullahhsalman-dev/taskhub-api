import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../schema/user.type';

// Extend the Request interface to include a typed `user` property
interface RequestWithUser extends Request {
  user: User;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);

// ? The custom decorator is named GetUser, and it is designed to extract the authenticated user's information from the request object.
//  ?Middleware and Guards: Decorators can be used to define middleware functions or guards, which intercept and modify incoming requests before they reach the controller.

// ? This function is used to create the custom GetUser decorator. The decorator will be applied to method parameters in controllers, allowing you to extract the user from the request.
