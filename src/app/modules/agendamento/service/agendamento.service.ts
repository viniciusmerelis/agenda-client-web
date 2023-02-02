import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Evento} from "../model/evento.model";

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/agendamentos';
    }

    obterHorariosPorDesigner(id: number): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.apiUrl}?designerId=${id}`);
    }
}
