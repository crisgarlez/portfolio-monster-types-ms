import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonsterType } from './monster-type.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class MonsterTypesService {
  constructor(
    @InjectRepository(MonsterType)
    private monsterTypeRepository: Repository<MonsterType>,
  ) {}

  create(data: any) {
    const newMonsterType = this.monsterTypeRepository.create({
      ...data,
      code: uuidv4(),
    });
    return this.monsterTypeRepository.save(newMonsterType);
  }

  getAll() {
    return this.monsterTypeRepository.find();
  }

  getByCode(code: string) {
    return this.monsterTypeRepository.findOne({ where: { code: code } });
  }

  update(id: string, data: any) {
    return this.monsterTypeRepository.update(id, data);
  }

  remove(id: string) {
    return this.monsterTypeRepository.delete(id);
  }
}
