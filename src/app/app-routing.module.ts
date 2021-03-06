import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/core/guards/auth.guard";
import {LoginComponent} from "./modules/core/components/login/login.component";
import {MainComponent} from "./modules/core/components/main/main.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], component: MainComponent,
      children: [
        { path: '', redirectTo: 'workspace', pathMatch: 'full' },
        { path: 'workspace', loadChildren: () => import('./modules/workspace/workspace.module').then(m => m.WorkspaceModule) },
        ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
