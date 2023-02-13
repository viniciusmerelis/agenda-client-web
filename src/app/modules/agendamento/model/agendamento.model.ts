import {Usuario} from "../../usuario/model/usuario.model";

export interface Agendamento {
    id: number;
    data: Date;
    cliente: Usuario;
    usuario: Usuario;
    status: any
}
