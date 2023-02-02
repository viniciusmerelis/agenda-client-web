import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Designer} from "../../model/designer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DesignerService} from "../../service/designer.service";
import {Table} from "primeng/table";

@Component({
    selector: 'app-designer-list',
    templateUrl: './designer-list.component.html',
    styleUrls: ['./designer-list.component.scss']
})
export class DesignerListComponent implements OnInit {

    designers: Designer[] = [];
    inativarDesignerDialog: boolean = false;
    idDesignerInativada: number;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private designerService: DesignerService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.listarDesingers();
    }

    listarDesingers(): void {
        this.designerService.listar().subscribe(designer => this.designers = designer);
    }

    novo(): void {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

    editar(id: number): void {
        this.router.navigate([`${id}`], {relativeTo: this.route});
    }

    exibirInativarClienteDialog(id: number): void {
        this.idDesignerInativada = id;
        this.inativarDesignerDialog = true;
    }

    inativar(): void {
        this.designerService.inativar(this.idDesignerInativada).subscribe({
            next: () => {
                this.inativarDesignerDialog = false;
                this.designers = this.designers.filter(d => d.id !== this.idDesignerInativada);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Designer inativada.',
                    life: 5000
                });
            },
            error: (error) => {
                this.inativarDesignerDialog = false;
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
