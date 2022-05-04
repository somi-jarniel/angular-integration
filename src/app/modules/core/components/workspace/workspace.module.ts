import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { DataTablesModule } from "angular-datatables";

import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

const routes: Routes = [
    { path: '', redirectTo: 'workspace', pathMatch: 'full' },
    { path: 'workspace', component:  ListComponent},
    { path: 'workspace/create', component: FormComponent },
    { path: 'workspace/edit/:id', component: FormComponent }
];

@NgModule({
    declarations: [
        ListComponent,
        FormComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        DataTablesModule,
        BrowserModule,
        HttpClientModule
    ],
    exports: [RouterModule]
})

export class WorkspaceRoutingModule {}