import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTestDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  key: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  password: string;
}
