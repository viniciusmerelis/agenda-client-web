import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente.model";
import {ClienteOutput} from "../model/output/cliente-output.model";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/clientes';
    }

    listar(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    obterPorId(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }

    salvar(cliente: ClienteOutput): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    atualizar(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
    }

    inativar(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
