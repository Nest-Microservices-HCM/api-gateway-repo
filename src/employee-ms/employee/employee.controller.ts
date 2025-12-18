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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreateEmployeeDto: CreateEmployeeDto) {
    console.log('creando empleado');
    try {
      const res = await firstValueFrom(
        this.client.send('employee-ms_createEmployee', CreateEmployeeDto),
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
        this.client.send('employee-ms_findAllEmployee', PaginationQuery),
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
        this.client.send('employee-ms_findOneEmployee', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('employee-ms_updateEmployee', {
          id: id,
          UpdateEmployeeDto: UpdateEmployeeDto,
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
        this.client.send('employee-ms_removeEmployee', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
