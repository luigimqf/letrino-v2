import { ModelWithTimestamp } from '../../shared/types';

export interface IWord extends ModelWithTimestamp {
  word: string;
  isGolden: boolean;
  isCompound: boolean;
  numberOfLetters: number;
}

export interface IWordRelatedDocument extends ModelWithTimestamp {
  wordId: string;
  deletedAt?: Date;
}

export interface ISkippedWord extends IWordRelatedDocument {
  userId: string;
}
