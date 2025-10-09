import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { firstValueFrom } from 'rxjs';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get('getUser/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await firstValueFrom(
        this.client.send('findUserById', { id }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  login(@Body() LoginAuthenticationDto: LoginAuthenticationDto) {
    return this.client.send('loginAuthentication', LoginAuthenticationDto);
  }

  @Post('register')
  register() {
    return this.client.send('registerAuthentication', {});
  }

  @Post('verify/:id')
  verify(@Param('id') id: string) {
    return this.client.send('verifyAuthentication', { id });
  }
}
