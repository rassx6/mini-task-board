import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    const board = this.boardRepo.create(createBoardDto);
    return this.boardRepo.save(board);
  }

  findAll() {
    return this.boardRepo.find({ relations: ['tasks'] });
  }

  async findOne(id: number) {
    const board = await this.boardRepo.findOne({ where: { id }, relations: ['tasks'] });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async remove(id: number) {
    const board = await this.findOne(id);
    return this.boardRepo.remove(board);
  }
}
