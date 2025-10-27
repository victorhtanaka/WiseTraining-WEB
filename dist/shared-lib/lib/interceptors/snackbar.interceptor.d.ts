import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
export declare class SnackbarInterceptor implements HttpInterceptor {
    private snackBar;
    constructor(snackBar: MatSnackBar);
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SnackbarInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SnackbarInterceptor>;
}
