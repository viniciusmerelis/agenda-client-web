import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioListComponent} from "./components/usuario-list/usuario-list.component";
import {UsuarioFormComponent} from "./components/usuario-form/usuario-form.component";

const routes: Routes = [
    {path: '', data: {breadcrumb: 'Usuários'}, component: UsuarioListComponent, pathMatch: 'full'},
    {path: ':param', data: {breadcrumb: 'Usuários'}, component: UsuarioFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
