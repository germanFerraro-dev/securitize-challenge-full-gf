import { IsString, IsBoolean } from 'class-validator';

export class ApiResponseDto {
  @IsBoolean()
  success: boolean;
  @IsString()
  message: string;
}
