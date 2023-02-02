import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendamentoRoutingModule} from './agendamento-routing.module';
import {AgendamentoFullcalendarComponent} from './agendamento-fullcalendar/agendamento-fullcalendar.component';
import {SharedModule} from "../../shared/shared.module";
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
    declarations: [
        AgendamentoFullcalendarComponent,
        AgendamentoFormComponent
    ],
    imports: [
        CommonModule,
        AgendamentoRoutingModule,
        SharedModule,
        FullCalendarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgendamentoModule {
}
