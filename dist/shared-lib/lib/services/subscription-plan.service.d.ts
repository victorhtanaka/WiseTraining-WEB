import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { SubscriptionPlan } from '../models/subscription-plan.model';
import * as i0 from "@angular/core";
export declare class SubscriptionPlanService extends BaseService<SubscriptionPlan> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<SubscriptionPlanService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SubscriptionPlanService>;
}
