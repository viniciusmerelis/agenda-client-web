import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteListComponent} from "./components/cliente-list/cliente-list.component";
import {ClienteFormComponent} from "./components/cliente-form/cliente-form.component";

const routes: Routes = [
    {path: '', data: {breadcrumb: 'Clientes'}, component: ClienteListComponent, pathMatch: 'full'},
    {path: ':param', data: {breadcrumb: 'Clientes'}, component: ClienteFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {
}
