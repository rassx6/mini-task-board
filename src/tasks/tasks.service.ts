import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { BoardsService } from 'src/boards/boards.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private boardsService: BoardsService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const board = await this.boardsService.findOne(createTaskDto.boardId);
    const task = this.taskRepo.create({
      title: createTaskDto.title,
      status: createTaskDto.status,
      board,
    });
    return this.taskRepo.save(task);
  }

  findAll(boardId?: number) {
    const options = boardId ? { where: { board: { id: boardId } }, relations: ['board'] } : {};
    return this.taskRepo.find(options);
  }

  async remove(id: number) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    return this.taskRepo.remove(task);
  }

  async update(id: number, updateDto: UpdateTaskDto) {
  const task = await this.taskRepo.findOneBy({ id });
  if (!task) throw new NotFoundException('Task not found');
  Object.assign(task, updateDto);
  return this.taskRepo.save(task);
  }
}


