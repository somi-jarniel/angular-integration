import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkSpaceDashboardComponent } from './components/work-space-dashboard/work-space-dashboard.component';
import { WorkSpaceCreateModalComponent } from './components/work-space-create-modal/work-space-create-modal.component';
import {Routes, RouterModule} from "@angular/router";

const routes :Routes = [
  { path: '', component: WorkSpaceDashboardComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [
    WorkSpaceDashboardComponent,
    WorkSpaceCreateModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkspaceModule { }
