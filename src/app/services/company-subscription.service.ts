import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CompanySubscription } from '../models/company-subscription.model';

@Injectable({
  providedIn: 'root'
})
export class CompanySubscriptionService extends BaseService<CompanySubscription> {

  constructor(http: HttpClient) {
    super(http, `CompanySubscription`);
  }
}
