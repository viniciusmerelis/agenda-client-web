import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClienteRoutingModule} from './cliente-routing.module';
import {ClienteListComponent} from './components/cliente-list/cliente-list.component';
import {SharedModule} from "../../shared/shared.module";
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import {NgxMaskModule} from "ngx-mask";


@NgModule({
    declarations: [
        ClienteListComponent,
        ClienteFormComponent
    ],
    imports: [
        CommonModule,
        ClienteRoutingModule,
        SharedModule,
        NgxMaskModule
    ]
})
export class ClienteModule {
}
