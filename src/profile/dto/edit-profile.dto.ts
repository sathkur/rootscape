import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditProfileDto {

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

}
