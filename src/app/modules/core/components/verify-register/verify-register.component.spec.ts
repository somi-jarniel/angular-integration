import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegisterComponent } from './verify-register.component';

describe('VerifyRegisterComponent', () => {
  let component: VerifyRegisterComponent;
  let fixture: ComponentFixture<VerifyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
