import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UsedWord } from './UsedWord';
import { Attempt } from './Attempt';
import { Match } from './Match';
import { BaseEntity } from './BaseEntity';

export interface IWord {
  id: string;
  word: string;
  isGolden: boolean;
  isCompound: boolean;
  numberOfLetters: number;
  usedWords: UsedWord[];
  attempts: Attempt[];
  createdAt: Date;
  updatedAt: Date;
}
@Entity('words')
export class Word extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  word: string;

  @Column({ type: 'boolean', default: false })
  isGolden: boolean;

  @Column({ type: 'boolean', default: false })
  isCompound: boolean;

  @Column({ type: 'int', default: 0 })
  numberOfLetters: number;

  @OneToMany(() => UsedWord, usedWord => usedWord.word)
  usedWords: UsedWord[];

  @OneToOne(() => Match, match => match.word)
  match: Match;

  @OneToMany(() => Attempt, attempt => attempt.word)
  attempts: Attempt[];

  @BeforeInsert()
  @BeforeUpdate()
  detectCompound() {
    this.isCompound = /[\s-]/.test(this.word);
  }

  @BeforeInsert()
  @BeforeUpdate()
  detectLetterCount() {
    this.numberOfLetters = this.word.replace(/[\s-]/g, '').length;
  }
}
