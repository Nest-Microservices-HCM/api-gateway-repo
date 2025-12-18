import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { DepartmentModule } from './department/department.module';
import { OrganizationModule } from './organization/organization.module';
import { HierarchicalLevelModule } from './hierarchical-level/hierarchical-level.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    CompanyModule,
    DepartmentModule,
    OrganizationModule,
    HierarchicalLevelModule,
    PositionModule,
  ],
})
export class CompanyMsModule {}
