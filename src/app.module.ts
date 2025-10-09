import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [AuthenticationModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
