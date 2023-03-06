import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../service/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {FormMessageValidator} from "../../../../shared/form-message-validator";
import {Usuario} from "../../model/usuario.model";
import {UsuarioOutput} from "../../model/output/usuario-output.model";

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    unsubscribeAll = new Subject<void>();
    titulo: string;
    estaCriando: boolean = false;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        public messageValidator: FormMessageValidator
    ) {

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
                    this.usuarioService.obterPorId(+param).subscribe(cliente => {
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
        const usuarioOutput: UsuarioOutput = {
            nome: this.form.get('nome').value,
            telefone: this.form.get('telefone').value,
            dataNascimento: this.form.get('dataNascimento').value
        }
        this.usuarioService.salvar(usuarioOutput).subscribe(() => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Cliente cadastrada.',
                life: 5500
            });
            this.irParaListaDeUsuarios();
        });
    }

    atualizar(): void {
        const usuario: Usuario = this.form.value;
        this.usuarioService.atualizar(usuario).subscribe(() => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Alterações realizadas com sucesso.',
                life: 5500
            });
            this.irParaListaDeUsuarios();
        });
    }

    voltar(): void {
        this.router.navigate(['/usuarios'], {relativeTo: this.route});
    }

    tituloDoForm(): void {
        if (this.route.snapshot.url[0].path == 'novo') {
            this.titulo = 'Novo Usuário';
            this.estaCriando = true;
        } else {
            this.titulo = 'Editando Usuário';
        }
    }

    irParaListaDeUsuarios(): void {
        this.router.navigate(['/usuarios'], {relativeTo: this.route});
    }
}
