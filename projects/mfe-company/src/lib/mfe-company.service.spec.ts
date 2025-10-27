import { TestBed } from '@angular/core/testing';

import { MfeCompanyService } from './mfe-company.service';

describe('MfeCompanyService', () => {
  let service: MfeCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
