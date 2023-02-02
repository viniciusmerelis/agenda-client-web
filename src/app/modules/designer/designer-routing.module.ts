import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DesignerListComponent} from "./components/designer-list/designer-list.component";
import {DesignerFormComponent} from "./components/designer-form/designer-form.component";

const routes: Routes = [
    { path: '', data: { breadcrumb: 'Designers' }, component: DesignerListComponent, pathMatch: 'full' },
    { path: ':param', data: { breadcrumb: 'Designers' }, component: DesignerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
