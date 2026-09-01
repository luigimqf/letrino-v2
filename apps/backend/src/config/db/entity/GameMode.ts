import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Match } from './Match';
import { boolean } from 'zod/v4';

export interface IGameMode {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  releasedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('game_modes')
export class GameMode extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  releasedAt: Date;

  @OneToMany(() => Match, match => match.gamemode)
  games: Match[];
}
