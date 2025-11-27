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
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() CreateOrganizationDto: CreateOrganizationDto) {
    try {
      const res = await firstValueFrom(
        this.client.send(
          'company-ms_createOrganization',
          CreateOrganizationDto,
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
        this.client.send('company-ms_findAllOrganization', PaginationQuery),
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
        this.client.send('company-ms_findOneOrganization', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateOrganizationDto: UpdateOrganizationDto,
  ) {
    try {
      const res = await firstValueFrom(
        this.client.send('company-ms_updateOrganization', {
          id: id,
          UpdateOrganizationDto,
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
        this.client.send('company-ms_removeOrganization', id),
      );
      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
