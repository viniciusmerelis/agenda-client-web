import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClienteRoutingModule} from './cliente-routing.module';
import {ClienteListComponent} from './components/cliente-list/cliente-list.component';
import {ClienteFormComponent} from './components/cliente-form/cliente-form.component';


@NgModule({
    declarations: [
        ClienteListComponent,
        ClienteFormComponent
    ],
    imports: [
        CommonModule,
        ClienteRoutingModule
    ]
})
export class ClienteModule {
}
