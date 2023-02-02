import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {FormMessageValidator} from "../../../shared/form-message-validator";

@Component({
    selector: 'app-agendamento-form',
    templateUrl: './agendamento-form.component.html',
    styleUrls: ['./agendamento-form.component.scss']
})
export class AgendamentoFormComponent extends FormMessageValidator implements OnInit, OnDestroy {

    form: FormGroup;
    unsubscribeAll = new Subject<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        super();
    }

    ngOnInit(): void {
        this.criarForm();
        this.definirPreenchimentoDoForm();
    }

    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    criarForm(): void {
        this.form = new FormGroup({
            id: new FormControl(),
            data: new FormControl(null, Validators.required),
            cliente: new FormControl(null, Validators.required),
            designer: new FormControl(null, Validators.required),
            status: new FormControl(null, Validators.required)
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
                        data: null,
                        cliente: null,
                        designer: null,
                        status: null
                    });
                }
            });
    }

    submitForm(): void {

    }
}
