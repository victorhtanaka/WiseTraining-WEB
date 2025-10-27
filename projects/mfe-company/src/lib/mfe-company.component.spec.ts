import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeCompanyComponent } from './mfe-company.component';

describe('MfeCompanyComponent', () => {
  let component: MfeCompanyComponent;
  let fixture: ComponentFixture<MfeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfeCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
