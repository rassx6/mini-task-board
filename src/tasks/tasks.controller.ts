import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Patch } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@ApiSecurity('x-api-key')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('boardId') boardId?: string) {
    return this.tasksService.findAll(boardId ? parseInt(boardId) : undefined);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
  @Patch(':id')
  update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateTaskDto: UpdateTaskDto,
) {
  return this.tasksService.update(id, updateTaskDto);
}
}
