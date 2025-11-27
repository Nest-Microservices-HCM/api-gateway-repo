import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [CompanyController],
  providers: [],
  imports: [NatsModule],
})
export class CompanyModule {}
