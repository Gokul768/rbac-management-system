import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {

  @ApiProperty({
    example: 'gokul@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'gokul123',
  })
  @IsNotEmpty()
  password!: string;
}