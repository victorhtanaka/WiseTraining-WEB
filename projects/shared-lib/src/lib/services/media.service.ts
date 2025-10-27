import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Media } from '../models/media.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends BaseService<Media> {

  constructor(http: HttpClient) {
    super(http, `Media`);
  }
  
  uploadFile(file: File): Observable<Media> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Create a new headers object without Content-Type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    // Use the new headers in the request
    return this.http.post<Media>(
      `${environment.apiUri}/${this.endpoint}/upload`, 
      formData, 
      { headers }
    );
  }
  
  getFullUrl(relativeUrl: string): string {
    // Check if it's already a full URL
    if (relativeUrl && (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://'))) {
      return relativeUrl;
    }
    
    // Check if it's a data URL
    if (relativeUrl && relativeUrl.startsWith('data:')) {
      return relativeUrl;
    }
    
    // Otherwise, construct full URL
    return relativeUrl ? `${environment.apiUri}${relativeUrl}` : '';
  }
}
