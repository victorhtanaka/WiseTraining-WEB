import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeAuthComponent } from './mfe-auth.component';

describe('MfeAuthComponent', () => {
  let component: MfeAuthComponent;
  let fixture: ComponentFixture<MfeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfeAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
