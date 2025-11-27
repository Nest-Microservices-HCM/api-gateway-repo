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

import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('position')
export class PositionController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreatePositionDto: CreatePositionDto) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_createPosition', CreatePositionDto),
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
        this.client.send('company-ms_findAllPosition', PaginationQuery),
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
        this.client.send('company-ms_findOnePosition', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdatePositionDto: UpdatePositionDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_updatePosition', {
          id: id,
          UpdatePositionDto,
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
        this.client.send('company-ms_removePosition', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
