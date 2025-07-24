import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Patch } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiQuery } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiSecurity('x-api-key')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiQuery({ name: 'boardId', required: false })
  @ApiQuery({ name: 'sort', required: false, example: 'createdAt:desc' })
  @Get()
  findAll(
    @Query('boardId') boardId?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    const boardIdNumber = boardId ? parseInt(boardId) : undefined;
    return this.tasksService.findAll(boardIdNumber, search, sort);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
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

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.restore(id);
  }
}
