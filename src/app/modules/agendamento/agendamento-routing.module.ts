import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgendamentoFullcalendarComponent} from "./agendamento-fullcalendar/agendamento-fullcalendar.component";
import {AgendamentoFormComponent} from "./agendamento-form/agendamento-form.component";

const routes: Routes = [
    {path: '', data: {breadcrumb: 'Agendamentos'}, component: AgendamentoFullcalendarComponent, pathMatch: 'full'},
    {path: ':param', data: {breadcrumb: 'Agendamentos'}, component: AgendamentoFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendamentoRoutingModule {
}
