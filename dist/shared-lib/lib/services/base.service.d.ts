import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class BaseService<T> {
    protected http: HttpClient;
    protected endpoint: string;
    protected httpOptions: {
        headers: HttpHeaders;
    };
    constructor(http: HttpClient, endpoint: string);
    getAll(): Observable<T[]>;
    getById(id: number): Observable<T>;
    post(item: T): Observable<T>;
    put(item: T): Observable<T>;
    delete(id: number): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseService<any>>;
}
