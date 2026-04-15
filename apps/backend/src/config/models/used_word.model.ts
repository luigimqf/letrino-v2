import { ModelWithTimestamp } from '../../shared/types';

export interface IUsedWord extends ModelWithTimestamp {
  wordId: string;
  deletedAt?: Date;
}
