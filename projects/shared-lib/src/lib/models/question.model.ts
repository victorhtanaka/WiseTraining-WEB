import { Answer } from './answer.model';
import { Base } from './base.model';
import { Exam } from './exam.model';

export interface Question extends Base {
  content?: string;
  examId: number;
  exam?: Exam;
  answers?: Answer[];
}
