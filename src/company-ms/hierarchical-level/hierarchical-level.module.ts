import { Module } from '@nestjs/common';
import { HierarchicalLevelController } from './hierarchical-level.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [HierarchicalLevelController],
  providers: [],
  imports: [NatsModule],
})
export class HierarchicalLevelModule {}
