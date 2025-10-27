import { Base } from './base.model';
import { Company } from './company.model';
import { User } from './user.model';

export interface Group extends Base {
  name: string;
  description?: string;
  companyId: number;
  company?: Company;
  users?: User[];
}
