import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SubscriptionPlan } from '../models/subscription-plan.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService extends BaseService<SubscriptionPlan> {

  constructor(http: HttpClient) {
    super(http, `SubscriptionPlan`);
  }
}
