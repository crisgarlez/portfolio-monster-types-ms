import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { MonsterTypesService } from './monster-types.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMonsterTypeDto, UpdateMonsterTypeDto } from './monster-type.dto';
import { MonsterType } from './monster-type.entity';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('monster-types')
@ApiTags('Monster Types management')
export class MonsterTypesController {
  private readonly logger = new Logger(MonsterTypesController.name);

  constructor(private monsterTypesService: MonsterTypesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'Get a list of monster types',
    summary: 'Monster types list',
  })
  @ApiOkResponse({ description: 'List of monster types', type: [MonsterType] })
  find() {
    this.logger.debug('find...');
    return this.monsterTypesService.getAll();
  }

  @Get(':code')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'Get a monster type by code',
    summary: 'Monster type by code',
  })
  @ApiParam({ name: 'code', description: "Monster type's code" })
  @ApiOkResponse({ description: 'A monster type', type: MonsterType })
  @ApiNotFoundResponse({ description: 'Monster type not found' })
  getByCode(@Param('code', new ParseUUIDPipe()) code: string) {
    this.logger.debug('getByCode...');
    return this.monsterTypesService.getByCode(code);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'Create a monster type',
    summary: 'Monster type creation',
  })
  @ApiBody({
    description: "Receive an object with the monster type's attributes.",
    type: CreateMonsterTypeDto,
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: MonsterType,
  })
  create(@Body() payload: CreateMonsterTypeDto): Promise<MonsterType> {
    this.logger.debug('create...');
    return this.monsterTypesService.create(payload);
  }

  @Put(':code')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'Update a monster type',
    summary: 'Monster type update',
  })
  @ApiParam({ name: 'code', description: "Monster type's code" })
  @ApiBody({
    description: "Receive an object with the monster type's attributes.",
    type: UpdateMonsterTypeDto,
  })
  update(
    @Param('code', new ParseUUIDPipe()) code: string,
    @Body() data: UpdateMonsterTypeDto,
  ) {
    this.logger.debug('update...');
    return this.monsterTypesService.update(code, data);
  }

  @Delete(':code')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'Delete a monster type',
    summary: 'Monster type delete',
  })
  @ApiParam({ name: 'code', description: "Monster type's code" })
  async delete(@Param('code', new ParseUUIDPipe()) code: string) {
    this.logger.debug('delete...');
    return this.monsterTypesService.remove(code);
  }
}
