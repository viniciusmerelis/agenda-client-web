import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Evento} from "../model/evento.model";
import {AgendamentoService} from "../service/agendamento.service";
import {FullCalendarComponent} from '@fullcalendar/angular';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {UsuarioService} from "../../usuario/service/usuario.service";
import {Usuario} from "../../usuario/model/usuario.model";


@Component({
    selector: 'app-agendamento-fullcalendar',
    templateUrl: './agendamento-fullcalendar.component.html',
    styleUrls: ['./agendamento-fullcalendar.component.scss']
})
export class AgendamentoFullcalendarComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('calendar') calendar: FullCalendarComponent;
    unsubscribeAll = new Subject<void>();
    usuarios: Usuario[] = [];
    designerSelecionada: Usuario;
    eventos: Evento[] = [];
    selecionarDesigner: boolean = false;
    exibirAgenda: boolean = false;

    constructor(
        private layoutService: LayoutService,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute,
        private agendamentoService: AgendamentoService
    ) {
    }

    ngOnInit(): void {
        this.obterDesigners();
    }

    ngAfterViewInit(): void {
        this.layoutService.menuChanged.pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
            this.calendarUpdateSize(250);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        events: [
            {title: 'Fulana', date: '2022-09-12T12:30:00-03:00'},
            {title: 'Ciclana', date: '2022-09-12T10:20:00-03:00'},
            {title: 'Fulana', date: '2022-09-12T07:30:00-03:00'},
            {title: 'Ciclana', date: '2022-09-12T17:30:00-03:00'},
            {title: 'Fulana', date: '2022-09-12T16:15:00-03:00'},
            {title: 'Ciclana', date: '2022-09-12T18:00:00-03:00'}
        ],
        dayMaxEventRows: true,
        views: {
            timeGrid: {
                dayMaxEventRows: 6
            }
        },
        locale: 'pt-br'
    };

    calendarUpdateSize(ms: number): void {
        setTimeout(() => {
            this.calendar.getApi().updateSize();
        }, ms);
    }

    obterDesigners(): void {
        this.usuarioService.listar().subscribe(usuario => {
            this.usuarios = usuario;
            this.selecionarDesigner = true;
        });
    }

    obterHorarios(id: number): void {
        this.agendamentoService.obterHorariosPorDesigner(id).subscribe(eventos => {
            this.eventos = eventos;
            // setTimeout(() => {
                // this.calendar.getApi().removeAllEventSources();
                // this.calendar.getApi().addEventSource(eventos);
            // });
            this.selecionarDesigner = false;
            this.exibirAgenda = true;
            this.calendarUpdateSize(100);
        });
    }

    voltarASelecaoDeDesigner(): void {
        this.designerSelecionada = null;
        this.exibirAgenda = false;
        this.selecionarDesigner = true;
    }

    irParaNovoAgendamento(): void {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

}

// events: [
//     {title: 'Fulana', date: '2022-09-12T12:30:00-03:00'},
//     {title: 'Ciclana', date: '2022-09-12T10:20:00-03:00'},
//     {title: 'Fulana', date: '2022-09-12T07:30:00-03:00'},
//     {title: 'Ciclana', date: '2022-09-12T17:30:00-03:00'},
//     {title: 'Fulana', date: '2022-09-12T16:15:00-03:00'},
//     {title: 'Ciclana', date: '2022-09-12T18:00:00-03:00'}
// ],
