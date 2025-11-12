import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { firstValueFrom } from 'rxjs';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { AuthGuard } from './guards/authentication.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permissions } from './decorators/permissions.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('Usuarios:Lista de Usuarios:CREATE')
  @Get('getUser/:id')
  async getUserById(
    @Param('id') id: string,
    @User() user: CurrentUser,
    @Token() token: string,
  ) {
    try {
      const userFound = await firstValueFrom(
        this.client.send('findUserById', { id }),
      );

      return userFound;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async login(@Body() LoginAuthenticationDto: LoginAuthenticationDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('loginAuthentication', LoginAuthenticationDto),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('register')
  async register(@Body() CreateAuthenticationDto: CreateAuthenticationDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('registerAuthentication', CreateAuthenticationDto),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() RequestPasswordResetDto: RequestPasswordResetDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('requestPasswordReset', RequestPasswordResetDto),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() ResetPasswordDto: ResetPasswordDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('resetPassword', ResetPasswordDto),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify/:id')
  async verify(@Param('id') id: string) {
    try {
      const res = await firstValueFrom(
        this.client.send('getUserPermissions', { id }),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
