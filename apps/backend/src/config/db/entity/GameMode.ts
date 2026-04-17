import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Match } from './Match';

export interface IGameMode {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('game_modes')
export class GameMode extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Match, match => match.gamemode)
  match: Match[];
}
