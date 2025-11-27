import { Module } from '@nestjs/common';
// import { AuthenticationModule } from './authentication/authentication.module';
import { NatsModule } from './transports/nats.module';
// import { CompanyModule } from './company-ms/company/company.module';
import { CompanyMsModule } from './company-ms/company-ms.module';

@Module({
  imports: [CompanyMsModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
