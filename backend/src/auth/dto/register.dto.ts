import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../users/schemas/user.schema';

export class RegisterDto {
  @ApiProperty({
    example: 'Gokul Kumar',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'gokul@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Minimum 6 characters',
  })
  @MinLength(6)
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.MEMBER,
    description: 'User role',
  })
  @IsEnum(UserRole)
  role!: UserRole;
}