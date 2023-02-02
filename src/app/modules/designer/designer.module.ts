import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DesignerRoutingModule} from './designer-routing.module';
import {DesignerListComponent} from './components/designer-list/designer-list.component';
import {SharedModule} from "../../shared/shared.module";
import {DesignerFormComponent} from './components/designer-form/designer-form.component';
import {NgxMaskModule} from "ngx-mask";


@NgModule({
    declarations: [
        DesignerListComponent,
        DesignerFormComponent
    ],
    imports: [
        CommonModule,
        DesignerRoutingModule,
        SharedModule,
        NgxMaskModule
    ]
})
export class DesignerModule {
}
