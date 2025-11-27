import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsJSON,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateHierarchicalLevelDto {
  @IsNotEmpty()
  @IsInt()
  level_number: number;

  @IsNotEmpty()
  @IsString()
  level_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  //   @IsOptional()
  //   @IsJSON()
  //   can_supervise?: any;

  //   @IsOptional()
  //   @IsString()
  //   report_to_level?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsNotEmpty()
  @IsUUID()
  organization_structure_type_id: string;
}
