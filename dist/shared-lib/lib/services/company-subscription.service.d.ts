import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { CompanySubscription } from '../models/company-subscription.model';
import * as i0 from "@angular/core";
export declare class CompanySubscriptionService extends BaseService<CompanySubscription> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<CompanySubscriptionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CompanySubscriptionService>;
}
