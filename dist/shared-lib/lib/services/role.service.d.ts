import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Role } from '../models/role.model';
import * as i0 from "@angular/core";
export declare class RoleService extends BaseService<Role> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<RoleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoleService>;
}
