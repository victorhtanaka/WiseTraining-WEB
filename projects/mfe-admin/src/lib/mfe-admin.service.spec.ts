import { TestBed } from '@angular/core/testing';

import { MfeAdminService } from './mfe-admin.service';

describe('MfeAdminService', () => {
  let service: MfeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
