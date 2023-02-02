import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {FormMessageValidator} from "../../../../shared/form-message-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DesignerService} from "../../service/designer.service";
import {Designer} from "../../model/designer.model";

@Component({
    selector: 'app-designer-form',
    templateUrl: './designer-form.component.html',
    styleUrls: ['./designer-form.component.scss']
})
export class DesignerFormComponent extends FormMessageValidator implements OnInit, OnDestroy {

    form: FormGroup;
    unsubscribeAll = new Subject<void>();
    titulo: string;
    estaCriando: boolean = false;

    constructor(
        private designerService: DesignerService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        super();
    }

    ngOnInit(): void {
        this.criarForm();
        this.tituloDoForm();
        this.definirPreenchimentoDoForm();
    }

    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    criarForm(): void {
        this.form = new FormGroup({
            id: new FormControl(),
            nome: new FormControl(null, Validators.required),
            telefone: new FormControl(null, [Validators.required, Validators.minLength(11)])
        });
    }

    definirPreenchimentoDoForm(): void {
        this.route.paramMap
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(params => {
                const param = params.get('param');
                if (param == 'novo') {
                    this.form.setValue({
                        id: null,
                        nome: null,
                        telefone: null
                    });
                } else {
                    this.designerService.obterPorId(+param).subscribe(designer => {
                        this.form.setValue(designer);
                        this.form.markAsPristine();
                        this.form.markAsUntouched();
                    });
                }
            });
    }

    submitForm(): void {
        if (this.estaCriando) {
            this.salvar();
        } else {
            this.atualizar();
        }
    }

    salvar(): void {
        const designer: Designer = this.form.value;
        this.designerService.salvar(designer).subscribe(designer => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Designer cadastrada.',
                life: 5500
            });
            this.irParaListaDeClientes();
        });
    }

    atualizar(): void {
        const designer: Designer = this.form.value;
        this.designerService.atualizar(designer).subscribe(designer => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Alterações realizadas com sucesso.',
                life: 5500
            });
            this.irParaListaDeClientes();
        });
    }

    voltar(): void {
        this.router.navigate(['/designers'], {relativeTo: this.route});
    }

    tituloDoForm(): void {
        if (this.route.snapshot.url[0].path == 'novo') {
            this.titulo = 'Nova Designer';
            this.estaCriando = true;
        } else {
            this.titulo = 'Editando Designer';
        }
    }

    irParaListaDeClientes(): void {
        this.router.navigate(['/designers'], {relativeTo: this.route});
    }

}
