import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MonsterTypesService } from './monster-types.service';

@Controller('monster-types')
export class MonsterTypesController {
  constructor(private monsterTypesService: MonsterTypesService) {}

  @Get()
  find() {
    console.log('#MonsterTypesController#');
    console.log('#find#');
    return this.monsterTypesService.getAll();
  }

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.monsterTypesService.getByCode(code);
  }

  @Post()
  async create(@Body() payload: any) {
    return this.monsterTypesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.monsterTypesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.monsterTypesService.remove(id);
  }
}
