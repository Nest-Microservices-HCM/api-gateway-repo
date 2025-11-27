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
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreateDepartmentDto: CreateDepartmentDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_createDepartment', CreateDepartmentDto),
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
        this.client.send('company-ms_findAllDepartment', PaginationQuery),
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
        this.client.send('company-ms_findOneDepartment', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateDepartmentDto: UpdateDepartmentDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_updateDepartment', {
          id: id,
          UpdateDepartmentDto,
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
        this.client.send('company-ms_removeDepartment', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
