import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'New Task head' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'done', enum: ['todo', 'in-progress', 'done'] })
  @IsOptional()
  @IsIn(['todo', 'in-progress', 'done'])
  status?: 'todo' | 'in-progress' | 'done';
}
