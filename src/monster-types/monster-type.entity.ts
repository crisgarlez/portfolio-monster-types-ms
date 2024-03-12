import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monster_types')
export class MonsterType {
  constructor(partial: Partial<MonsterType>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: "Monster's code.",
    example: 'changemeplease',
  })
  code: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: "Monster type's name.",
    example: 'Poison',
  })
  name: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: "Monster Type's key.",
    example: 'PO',
  })
  key: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: "Monster Type's incubation time (in minutes).",
    example: 5,
    minimum: 1,
    maximum: 10,
  })
  incubation_time: number;
}
