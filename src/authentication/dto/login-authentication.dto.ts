import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole, UserRoleList } from '../enum/authentication.enum';

export class LoginAuthenticationDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRoleList, {
    each: true,
    message: `Possible user roles values are ${UserRoleList}`,
  })
  userRole: UserRole[];
}
