import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../../service/cliente.service";
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Cliente} from "../../model/cliente.model";

@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

    clientes: Cliente[] = [];
    inativarClienteDialog: boolean = false;
    idClienteInativada: number;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private clienteService: ClienteService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.listarClientes();
    }

    listarClientes(): void {
        this.clienteService.listar().subscribe(cliente => this.clientes = cliente);
    }

    novo(): void {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

    editar(id: number): void {
        this.router.navigate([`${id}`], {relativeTo: this.route});
    }

    exibirInativarClienteDialog(id: number): void {
        this.idClienteInativada = id;
        this.inativarClienteDialog = true;
    }

    inativar(): void {
        this.clienteService.inativar(this.idClienteInativada).subscribe({
            next: () => {
                this.inativarClienteDialog = false;
                this.clientes = this.clientes.filter(c => c.id !== this.idClienteInativada);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Cliente inativada.',
                    life: 5000
                });
            },
            error: (error) => {
                this.inativarClienteDialog = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Falha!',
                    detail: error.error.userMessage,
                    life: 5000
                });
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
