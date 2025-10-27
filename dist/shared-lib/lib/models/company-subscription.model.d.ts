import { Base } from './base.model';
import { Company } from './company.model';
import { SubscriptionPlan } from './subscription-plan.model';
export interface CompanySubscription extends Base {
    companyId: number;
    company?: Company;
    planId: number;
    plan?: SubscriptionPlan;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
