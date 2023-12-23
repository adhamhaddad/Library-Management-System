import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // Assuming you set the user object during authentication
    const request = context.switchToHttp().getRequest();
    let userType;
    if (request?.user) userType = request.user.role;

    // Check if the user has the 'admin' role (assuming UserType is the property representing the role)
    return userType === RoleType.ADMIN;
  }
}
