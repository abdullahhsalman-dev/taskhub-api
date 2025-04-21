import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Finish homework' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'COMPLETED', enum: ['PENDING', 'COMPLETED'] })
  @IsOptional()
  @IsString()
  status?: 'PENDING' | 'COMPLETED';
}
