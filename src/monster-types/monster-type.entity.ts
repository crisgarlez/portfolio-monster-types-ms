import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monster_types')
export class MonsterType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: true })
  incubation_time: number;
}
