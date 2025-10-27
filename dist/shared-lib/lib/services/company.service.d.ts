import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Company } from '../models/company.model';
import * as i0 from "@angular/core";
export declare class CompanyService extends BaseService<Company> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<CompanyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CompanyService>;
}
