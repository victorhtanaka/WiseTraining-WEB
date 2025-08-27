import { Base } from './base.model';
import { Question } from './question.model';

export interface Exam extends Base {
  title: string;
  description: string;
  duration: number;
  passingScore: number;
  maxAttempts: number;
  questions: Question[];
}
