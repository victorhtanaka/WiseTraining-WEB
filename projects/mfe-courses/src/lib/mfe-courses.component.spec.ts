import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeCoursesComponent } from './mfe-courses.component';

describe('MfeCoursesComponent', () => {
  let component: MfeCoursesComponent;
  let fixture: ComponentFixture<MfeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfeCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
