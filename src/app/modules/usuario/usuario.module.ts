import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuarioRoutingModule} from './usuario-routing.module';
import {UsuarioListComponent} from './components/usuario-list/usuario-list.component';
import {SharedModule} from "../../shared/shared.module";
import {UsuarioFormComponent} from './components/usuario-form/usuario-form.component';
import {NgxMaskModule} from "ngx-mask";


@NgModule({
    declarations: [
        UsuarioListComponent,
        UsuarioFormComponent
    ],
    imports: [
        CommonModule,
        UsuarioRoutingModule,
        SharedModule,
        NgxMaskModule
    ]
})
export class UsuarioModule {
}
