import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [DepartmentController],
  providers: [],
  imports: [NatsModule],
})
export class DepartmentModule {}
