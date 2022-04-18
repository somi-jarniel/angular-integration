import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceDashboardComponent } from './work-space-dashboard.component';

describe('WorkSpaceDashboardComponent', () => {
  let component: WorkSpaceDashboardComponent;
  let fixture: ComponentFixture<WorkSpaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSpaceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
