import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Answer } from '../models/answer.model';
import * as i0 from "@angular/core";
export declare class AnswerService extends BaseService<Answer> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnswerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnswerService>;
}
