import {AbstractControl} from "@angular/forms";

export class FormMessageValidator {

    constructor() {
    }

    deveMostrarMensagemDeValidacao(control: AbstractControl): boolean {
        return control.errors && control.touched;
    }

    mensagemDeValidacao(control: AbstractControl): string {
        if (control.hasError('required')) {
            return 'Campo requerido.';
        }
        if (control.hasError('minlength')) {
            return `O telefone deve ter ${control.getError('minlength').requiredLength} digitos.`;
        }
        return '';
    }
}
