import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {

  @ApiProperty({
    example: 'Ramesh Kumar',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'ramesh@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '9876543210',
  })
  @IsString()
  phone!: string;

  @ApiProperty({
    example: 'Member',
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}