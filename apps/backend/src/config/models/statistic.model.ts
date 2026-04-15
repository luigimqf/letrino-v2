import { EAttemptStatus } from '../../shared/constants/attempt';
import { ModelWithTimestamp } from '../../shared/types';

export interface IStatistic extends ModelWithTimestamp {
  wordId: string;
  attempt: string;
  userId: string;
  type: EAttemptStatus;
}
