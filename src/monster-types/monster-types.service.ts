import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterType } from './monster-type.entity';
import { UpdateMonsterTypeDto } from './monster-type.dto';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class MonsterTypesService {
  private readonly logger = new Logger(MonsterTypesService.name);

  constructor(
    @InjectRepository(MonsterType)
    private monsterTypeRepository: Repository<MonsterType>,
  ) {}

  create(data: any): Promise<any> {
    this.logger.debug('create...');
    const newMonsterType = this.monsterTypeRepository.create({
      ...data,
      code: uuidv4(),
    });
    return this.monsterTypeRepository.save(newMonsterType);
  }

  getAll() {
    this.logger.debug('getAll...');
    return this.monsterTypeRepository.find();
  }

  async getByCode(code: string) {
    this.logger.debug('getByCode...');
    const monsterType = await this.monsterTypeRepository.findOne({
      where: { code: code },
    });

    if (!monsterType) {
      throw new NotFoundException();
    }

    return monsterType;
  }

  async update(code: string, data: UpdateMonsterTypeDto) {
    this.logger.debug('update...');
    const monsterType = await this.monsterTypeRepository.findOne({
      where: { code: code },
    });

    if (!monsterType) {
      throw new NotFoundException();
    }

    return this.monsterTypeRepository.update(monsterType.id, data);
  }

  remove(code: string) {
    this.logger.debug('remove...');
    return this.monsterTypeRepository.delete({ code: code });
  }
}
