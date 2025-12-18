import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EmployeeController],
  providers: [],
  imports: [NatsModule],
})
export class EmployeeModule {}
