import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Tag } from '../models/tag.model';
import * as i0 from "@angular/core";
export declare class TagService extends BaseService<Tag> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<TagService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TagService>;
}
