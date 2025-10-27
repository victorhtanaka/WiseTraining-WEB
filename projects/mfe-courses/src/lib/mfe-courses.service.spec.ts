import { TestBed } from '@angular/core/testing';

import { MfeCoursesService } from './mfe-courses.service';

describe('MfeCoursesService', () => {
  let service: MfeCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
