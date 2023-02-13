import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../service/usuario.service";
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Usuario} from "../../model/usuario.model";

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

    usuarios: Usuario[] = [];
    inativarUsuarioDialog: boolean = false;
    idUsuarioInativado: number;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.listarUsuarios();
    }

    listarUsuarios(): void {
        this.usuarioService.listar().subscribe(usuario => this.usuarios = usuario);
    }

    novo(): void {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

    editar(id: number): void {
        this.router.navigate([`${id}`], {relativeTo: this.route});
    }

    exibirInativarUsuarioDialog(id: number): void {
        this.idUsuarioInativado = id;
        this.inativarUsuarioDialog = true;
    }

    inativar(): void {
        this.usuarioService.inativar(this.idUsuarioInativado).subscribe({
            next: () => {
                this.inativarUsuarioDialog = false;
                this.usuarios = this.usuarios.filter(c => c.id !== this.idUsuarioInativado);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Cliente inativada.',
                    life: 5000
                });
            },
            error: (error) => {
                this.inativarUsuarioDialog = false;
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
