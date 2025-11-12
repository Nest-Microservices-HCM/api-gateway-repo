import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const roleId = request.headers['x-role-id'] as string;

    if (!roleId) {
      throw new BadRequestException('Role ID header is missing');
    }

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('verifyAuthenticationToken', token),
      );

      //Validar que el rol exista y pertenezca al usuario
      if (roleId) {
        const hasRole = user.roles.some((r) => r.id === roleId);
        if (!hasRole) {
          throw new BadRequestException('Invalid role for this user');
        }
        request['currentRole'] = user.roles.find((r) => r.id === roleId);
      } else {
        // Si no especifica, tomar el primer rol o dejarlo vacío
        request['currentRole'] = user.roles[0] || null;
      }
      request['user'] = user;
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
