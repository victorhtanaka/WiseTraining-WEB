import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';
import * as i0 from "@angular/core";
export declare class CompanyManagementService extends BaseService<Company> {
    protected http: HttpClient;
    constructor(http: HttpClient);
    getMyCompany(): Observable<Company>;
    getCompanyUsers(companyId: number): Observable<User[]>;
    addUserToGroup(userId: number, groupId: number): Observable<boolean>;
    removeUserFromGroup(userId: number, groupId: number): Observable<boolean>;
    update(company: Company): Observable<Company>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompanyManagementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CompanyManagementService>;
}
