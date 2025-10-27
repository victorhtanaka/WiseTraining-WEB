import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeAdminComponent } from './mfe-admin.component';

describe('MfeAdminComponent', () => {
  let component: MfeAdminComponent;
  let fixture: ComponentFixture<MfeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
