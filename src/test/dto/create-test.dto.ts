import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  key: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
