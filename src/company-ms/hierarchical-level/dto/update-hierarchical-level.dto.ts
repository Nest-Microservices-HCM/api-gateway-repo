import { PartialType } from '@nestjs/mapped-types';
import { CreateHierarchicalLevelDto } from './create-hierarchical-level.dto';

export class UpdateHierarchicalLevelDto extends PartialType(CreateHierarchicalLevelDto) {}
