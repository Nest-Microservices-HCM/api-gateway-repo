import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PositionController],
  providers: [],
  imports: [NatsModule],
})
export class PositionModule {}
