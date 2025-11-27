import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  IsNotEmpty,
  IsUUID,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  position_name: string;

  @IsNotEmpty()
  @IsString()
  position_code: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  salary: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsOptional()
  @IsObject()
  required_competencies?: any;

  @IsOptional()
  @IsObject()
  responsibilities?: any;

  @IsOptional()
  @IsNumber()
  @Min(0)
  authorized_positions?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  occupied_positions?: number;

  @IsOptional()
  @IsObject()
  can_supervise?: any;

  @IsOptional()
  @IsString()
  report_to_level?: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  hierarchical_level_id: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  department_id: string;
}
