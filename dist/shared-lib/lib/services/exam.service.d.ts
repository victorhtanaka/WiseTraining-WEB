import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Exam } from '../models/exam.model';
import * as i0 from "@angular/core";
export declare class ExamService extends BaseService<Exam> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<ExamService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExamService>;
}
