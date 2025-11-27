// src/address/dto/create-address.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  colony: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsOptional()
  interior_number?: string;

  @IsString()
  @IsNotEmpty()
  outer_number: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
