import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Match } from './Match';
import { Word } from './Word';
import { EAttemptStatus } from '../../../shared/constants/attempt';
import { BaseEntity } from './BaseEntity';
import { GuestSession } from './GuestSession';

@Entity('attempts')
export class Attempt extends BaseEntity {
  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @ManyToOne(() => GuestSession, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guestSessionId' })
  guestSession: GuestSession | null;

  @Column({ type: 'uuid', nullable: true })
  guestSessionId: string | null;

  @ManyToOne(() => Match, match => match.attempts)
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({ type: 'uuid' })
  matchId: string;

  @ManyToOne(() => Word, word => word.attempts)
  @JoinColumn({ name: 'wordId' })
  word: Word;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  userInput: string;

  @Column({
    type: 'enum',
    enum: EAttemptStatus,
  })
  result: EAttemptStatus;
}
