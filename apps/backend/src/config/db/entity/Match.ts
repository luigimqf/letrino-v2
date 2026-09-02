import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  Unique,
  Check,
} from 'typeorm';
import { User } from './User';
import { Attempt } from './Attempt';
import { EGameStatus } from '../../../shared/constants/match';
import { BaseEntity } from './BaseEntity';
import { GameMode } from './GameMode';
import { GuestSession } from './GuestSession';

export interface IMatch {
  id: string;
  attempts: Attempt[];
  gamemodeId: string;
  userId: string | null;
  guestSessionId: string | null;
  score: number;
  result: EGameStatus;
  dayKey: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('matches')
@Unique('uq_match_user_mode_day', ['userId', 'gamemodeId', 'dayKey'])
@Unique('uq_match_guest_mode_day', ['guestSessionId', 'gamemodeId', 'dayKey'])
@Check('chk_match_owner', `("userId" IS NULL) <> ("guestSessionId" IS NULL)`)
export class Match extends BaseEntity {
  @OneToMany(() => Attempt, attempt => attempt.match, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  attempts: Attempt[];

  @ManyToOne(() => User, user => user.matches, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @ManyToOne(() => GuestSession, gs => gs.matches, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'guestSessionId' })
  guestSession: GuestSession | null;

  @Column({ type: 'uuid', nullable: true })
  guestSessionId: string | null;

  @ManyToOne(() => GameMode, gamemode => gamemode.games)
  @JoinColumn({ name: 'gamemodeId' })
  gamemode: GameMode;

  @Column()
  gamemodeId: string;

  @Column({ nullable: true, default: 0 })
  score: number;

  @Column({ type: 'enum', enum: EGameStatus })
  result: EGameStatus;

  @Column({ type: 'date' })
  dayKey: string;
}
