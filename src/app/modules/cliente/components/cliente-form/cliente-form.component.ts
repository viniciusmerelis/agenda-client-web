import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../service/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {FormMessageValidator} from "../../../../shared/form-message-validator";
import {Cliente} from "../../model/cliente.model";
import {ClienteOutput} from "../../model/output/cliente-output.model";

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends FormMessageValidator implements OnInit, OnDestroy {

    form: FormGroup;
    unsubscribeAll = new Subject<void>();
    titulo: string;
    estaCriando: boolean = false;

    constructor(
        private clienteService: ClienteService,
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
            telefone: new FormControl(null, [Validators.required, Validators.minLength(11)]),
            dataNascimento: new FormControl(null)
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
                        telefone: null,
                        dataNascimento: null
                    });
                } else {
                    this.clienteService.obterPorId(+param).subscribe(cliente => {
                        this.form.setValue(cliente);
                        if (cliente.dataNascimento) {
                            this.form.get('dataNascimento').setValue(new Date(cliente.dataNascimento));
                        }
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
        const cliente: ClienteOutput = {
            nome: this.form.get('nome').value,
            telefone: this.form.get('telefone').value,
            dataNascimento: this.form.get('dataNascimento').value
        }
        this.clienteService.salvar(cliente).subscribe(() => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Cliente cadastrada.',
                life: 5500
            });
            this.irParaListaDeClientes();
        });
    }

    atualizar(): void {
        const cliente: Cliente = this.form.value;
        this.clienteService.atualizar(cliente).subscribe(() => {
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
        this.router.navigate(['/clientes'], {relativeTo: this.route});
    }

    tituloDoForm(): void {
        if (this.route.snapshot.url[0].path == 'novo') {
            this.titulo = 'Nova Cliente';
            this.estaCriando = true;
        } else {
            this.titulo = 'Editando Cliente';
        }
    }

    irParaListaDeClientes(): void {
        this.router.navigate(['/clientes'], {relativeTo: this.route});
    }
}
