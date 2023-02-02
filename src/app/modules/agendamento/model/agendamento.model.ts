import {Cliente} from "../../cliente/model/cliente.model";
import {Designer} from "../../designer/model/designer.model";

export interface Agendamento {
    id: number;
    data: Date;
    cliente: Cliente;
    designer: Designer;
    status: any
}
