import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // *Leemos los permisos requeridos del decorador
    const requiredPerms = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPerms?.length) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const roleId = req.currentRole.id;

    if (!user || !user.id || !roleId) {
      throw new ForbiddenException('User or role not found in request');
    }

    const userId = user.id;

    try {
      // *Consultamos al microservicio de autenticación o permisos vía NATS
      const userPerms = await firstValueFrom(
        this.natsClient.send<string[]>('getUserPermissions', {
          userId,
          roleId,
        }),
      );
      console.log('userPerms1', userPerms);
      // *Verificamos que el usuario tenga todos los permisos requeridos
      const hasAllPerms = requiredPerms.every((perm) =>
        userPerms.includes(perm),
      );

      if (!hasAllPerms) {
        throw new ForbiddenException(
          'You do not have sufficient permissions to access this resource',
        );
      }

      return true;
    } catch (error) {
      throw new ForbiddenException(
        'You do not have sufficient permissions to access this resource',
      );
    }
  }
}
