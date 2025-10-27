import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Media } from '../models/media.model';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MediaService extends BaseService<Media> {
    constructor(http: HttpClient);
    uploadFile(file: File): Observable<Media>;
    getFullUrl(relativeUrl: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MediaService>;
}
