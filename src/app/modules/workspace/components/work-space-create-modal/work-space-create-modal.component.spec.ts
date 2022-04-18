import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceCreateModalComponent } from './work-space-create-modal.component';

describe('WorkSpaceCreateModalComponent', () => {
  let component: WorkSpaceCreateModalComponent;
  let fixture: ComponentFixture<WorkSpaceCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSpaceCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
