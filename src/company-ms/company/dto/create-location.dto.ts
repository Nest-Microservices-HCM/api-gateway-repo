import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  location_name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_headquarters: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
