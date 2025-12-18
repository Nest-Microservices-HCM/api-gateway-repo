import { Module } from '@nestjs/common';
// import { AuthenticationModule } from './authentication/authentication.module';
import { NatsModule } from './transports/nats.module';
// import { CompanyModule } from './company-ms/company/company.module';
import { CompanyMsModule } from './company-ms/company-ms.module';
import { EmployeeMsModule } from './employee-ms/employee-ms.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    CompanyMsModule,
    EmployeeMsModule,
    NatsModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
