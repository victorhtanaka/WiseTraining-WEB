import { Observable } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import * as i0 from "@angular/core";
export declare class SpinnerInterceptor implements HttpInterceptor {
    private spinnerService;
    constructor(spinnerService: SpinnerService);
    private reqCount;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpinnerInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SpinnerInterceptor>;
}
