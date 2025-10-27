import { Base } from './base.model';
import { User } from './user.model';
export interface Role extends Base {
    code?: string;
    name?: string;
    description?: string;
    users?: User[];
}
