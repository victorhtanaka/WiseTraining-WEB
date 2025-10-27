import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Group } from '../models/group.model';
import * as i0 from "@angular/core";
export declare class GroupService extends BaseService<Group> {
    protected http: HttpClient;
    constructor(http: HttpClient);
    getByCompanyId(companyId: number): Observable<Group[]>;
    create(group: Group): Observable<Group>;
    update(group: Group): Observable<Group>;
    deleteGroup(groupId: number): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GroupService>;
}
