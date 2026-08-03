import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}