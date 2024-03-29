import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();

    let hasAccess: boolean;

    hasAccess = requiredRoles.indexOf(user.role) > -1;

    return hasAccess;
  }
}
