import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';

import { UpdateCompanyDto } from './dto/update-company.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreateCompanyDto: CreateCompanyDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_createCompany', CreateCompanyDto),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('findAll')
  async findAll(@Query() PaginationQuery: PaginationQueryDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_findAllCompany', PaginationQuery),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_findOneCompany', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_updateCompany', {
          id: id,
          updateCompanyDto: UpdateCompanyDto,
        }),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_removeCompany', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
