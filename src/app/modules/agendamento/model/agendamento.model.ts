import {Cliente} from "../../usuario/model/usuario.model";

export interface Agendamento {
    id: number;
    data: Date;
    cliente: Cliente;
    usuario: Cliente;
    status: any
}
