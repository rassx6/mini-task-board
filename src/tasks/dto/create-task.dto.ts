import { IsString, IsIn, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsIn(['todo', 'in-progress', 'done'])
  status: 'todo' | 'in-progress' | 'done';

  @IsInt()
  boardId: number;
}