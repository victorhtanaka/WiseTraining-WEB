import { Base } from './base.model';
import { CompanySubscription } from './company-subscription.model';
export interface SubscriptionPlan extends Base {
    name?: string;
    pricePerMonth: number;
    maxUsers: number;
    maxCourses: number;
    companySubscriptions?: CompanySubscription[];
}
