import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [AuthenticationController],
  providers: [],
  imports: [NatsModule],
})
export class AuthenticationModule {}
