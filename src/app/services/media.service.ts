import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends BaseService<Media> {

  constructor(http: HttpClient) {
    super(http, `Media`);
  }
}
