import { Type } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from 'src/employee-ms/enums/employee.enums';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  employee_code: string;

  @IsString()
  @IsNotEmpty()
  curp: string;

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  first_surname: string;

  @IsString()
  @IsNotEmpty()
  last_surname: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth_date: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
