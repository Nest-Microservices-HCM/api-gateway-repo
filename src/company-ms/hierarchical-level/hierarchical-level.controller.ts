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
import { CreateHierarchicalLevelDto } from './dto/create-hierarchical-level.dto';
import { UpdateHierarchicalLevelDto } from './dto/update-hierarchical-level.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('hierarchicalLevel')
export class HierarchicalLevelController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreateHierarchicalLevelDto: CreateHierarchicalLevelDto) {
    try {
      const res = await firstValueFrom(
        this.client.send(
          'company-ms_createHierarchicalLevel',
          CreateHierarchicalLevelDto,
        ),
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
        this.client.send(
          'company-ms_findAllHierarchicalLevel',
          PaginationQuery,
        ),
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
        this.client.send('company-ms_findOneHierarchicalLevel', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateHierarchicalLevelDto: UpdateHierarchicalLevelDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_updateHierarchicalLevel', {
          id: id,
          UpdateHierarchicalLevelDto,
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
        this.client.send('company-ms_removeHierarchicalLevel', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
