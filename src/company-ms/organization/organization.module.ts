import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrganizationController],
  providers: [],
  imports: [NatsModule],
})
export class OrganizationModule {}
