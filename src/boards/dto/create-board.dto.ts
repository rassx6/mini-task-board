import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: 'Project N' })
  @IsString()
  @MinLength(1)
  title: string;
}
