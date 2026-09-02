import { Entity, ManyToOne, JoinColumn, Column, Check } from 'typeorm';
import { Word } from './Word';
import { User } from './User';
import { GuestSession } from './GuestSession';
import { BaseEntity } from './BaseEntity';

export interface IUsedWord {
  id: string;
  wordId: string;
  userId: string | null;
  guestSessionId: string | null;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('used_words')
@Check(
  'chk_used_word_owner',
  `("userId" IS NULL) <> ("guestSessionId" IS NULL)`
)
export class UsedWord extends BaseEntity {
  @ManyToOne(() => User, user => user.usedWords, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @ManyToOne(() => GuestSession, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guestSessionId' })
  guestSession: GuestSession | null;

  @Column({ type: 'uuid', nullable: true })
  guestSessionId: string | null;

  @ManyToOne(() => Word, word => word.usedWords, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'wordId' })
  word: Word;

  @Column({ type: 'uuid' })
  wordId: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
