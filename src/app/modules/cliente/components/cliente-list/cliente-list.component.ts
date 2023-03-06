import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Cliente} from "../../model/cliente.model";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

    clientes: Cliente[] = [];
    excluirClienteDialog: boolean = false;
    idClienteExcluido: number;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private clienteService: ClienteService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.listarUsuarios();
    }

    listarUsuarios(): void {
        this.clienteService.listar().subscribe(usuario => this.clientes = usuario);
    }

    novo(): void {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

    editar(id: number): void {
        this.router.navigate([`${id}`], {relativeTo: this.route});
    }

    exibirInativarUsuarioDialog(id: number): void {
        this.idClienteExcluido = id;
        this.excluirClienteDialog = true;
    }

    inativar(): void {
        this.clienteService.excluir(this.idClienteExcluido).subscribe({
            next: () => {
                this.excluirClienteDialog = false;
                this.clientes = this.clientes.filter(c => c.id !== this.idClienteExcluido);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Cliente excluido.',
                    life: 5000
                });
            },
            error: (error) => {
                this.excluirClienteDialog = false;
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
