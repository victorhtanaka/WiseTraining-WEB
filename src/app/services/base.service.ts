import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export abstract class BaseService<T> {

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    };

    constructor(protected http: HttpClient, @Inject(String) protected endpoint: string) { }

    getAll(): Observable<T[]> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get<T[]>(`${environment.apiUri}/${this.endpoint}`, this.httpOptions);
    }


    getById(id: number): Observable<T> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get<T>(`${environment.apiUri}/${this.endpoint}/GetById/${id}`, this.httpOptions);
    }

    post(item: T): Observable<T> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post<T>(`${environment.apiUri}/${this.endpoint}`, item, this.httpOptions);
    }

    put(item: T): Observable<T> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.put<T>(`${environment.apiUri}/${this.endpoint}`, item, this.httpOptions);
    }

    delete(id: number): Observable<T> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete<T>(`${environment.apiUri}/${this.endpoint}/${id}`, this.httpOptions);
    }
}
