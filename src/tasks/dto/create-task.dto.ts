import { IsString, IsIn, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiPropertyOptional({ example: 'done', enum: ['todo', 'in-progress', 'done'] })
  @IsIn(['todo', 'in-progress', 'done'])
  status: 'todo' | 'in-progress' | 'done';
  @ApiProperty()
  @IsInt()
  boardId: number;
}