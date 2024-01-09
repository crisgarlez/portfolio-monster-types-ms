import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterType } from './monster-type.entity';
import { MonsterTypesController } from './monster-types.controller';
import { MonsterTypesService } from './monster-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterType])],
  providers: [MonsterTypesService],
  controllers: [MonsterTypesController],
})
export class MonsterTypesModule {}
