import { Base } from './base.model';
import { CompanySubscription } from './company-subscription.model';
import { Course } from './course.model';
import { Group } from './group.model';

export interface Company extends Base {
  name: string;
  domain?: string;
  courses?: Course[];
  groups?: Group[];
  companySubscriptions?: CompanySubscription[];
}
