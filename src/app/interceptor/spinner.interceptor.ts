import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }
  private reqCount: number = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqCount++;
    this.spinnerService.show();
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.reqCount--;
            if(this.reqCount<=0){
              this.spinnerService.hide();
              this.reqCount = 0;
            }
          }
        },(error) => {
            this.reqCount--;
            if(this.reqCount<=0){
              this.spinnerService.hide();
              this.reqCount = 0;
            }
        })
      );
  }
}
