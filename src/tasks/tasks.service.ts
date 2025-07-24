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
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const board = await this.boardsService.findOne(createTaskDto.boardId);
    const task = this.taskRepo.create({
      title: createTaskDto.title,
      status: createTaskDto.status,
      board,
    });
    return this.taskRepo.save(task);
  }

  findAll(boardId?: number, search?: string, sort?: string) {
    const query = this.taskRepo.createQueryBuilder('task')
      .leftJoinAndSelect('task.board', 'board');

    if (boardId) {
      query.andWhere('task.boardId = :boardId', { boardId });
    }

    if (search) {
      query.andWhere('LOWER(task.title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
    if (sort) {
      const [field, direction] = sort.split(':');
      const allowedFields = ['title', 'status', 'createdAt'];
      const allowedDir = ['ASC', 'DESC'];

      if (allowedFields.includes(field) && allowedDir.includes(direction.toUpperCase())) {
        query.orderBy(`task.${field}`, direction.toUpperCase() as 'ASC' | 'DESC');
      }
    }
    return query.getMany();
  }

  async update(id: number, updateDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    Object.assign(task, updateDto);
    return this.taskRepo.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    return this.taskRepo.softDelete(id);
  }

  async restore(id: number) {
    const result = await this.taskRepo.restore(id);

    if (result.affected === 0) {
      throw new NotFoundException('Deleted task not found');
    }

    return { message: 'Task restored' };
  }

  async findOne(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['board'],
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
}


