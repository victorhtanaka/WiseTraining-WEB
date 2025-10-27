import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Question } from '../models/question.model';
import * as i0 from "@angular/core";
export declare class QuestionService extends BaseService<Question> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<QuestionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuestionService>;
}
