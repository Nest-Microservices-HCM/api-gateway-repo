// create-organization-structure-type.dto.ts
import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  structure_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsInt()
  @IsNotEmpty()
  level: number;

  @IsBoolean()
  @IsNotEmpty()
  is_template: boolean;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsUUID()
  @IsNotEmpty()
  company_id: string;
}
