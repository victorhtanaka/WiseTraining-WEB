import { Base } from './base.model';
import { Question } from './question.model';
export interface Answer extends Base {
    content?: string;
    isCorrect: boolean;
    questionId: number;
    question?: Question;
}
