import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Category } from '../models/category.model';
import * as i0 from "@angular/core";
export declare class CategoryService extends BaseService<Category> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CategoryService>;
}
