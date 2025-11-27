import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsObject,
  ValidateNested,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from './create-location.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  trade_name: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @Type(() => Date)
  foundation_date: Date;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
