import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente.model";
import {ClienteOutput} from "../model/output/cliente-output.model";
import {environment} from "../../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/clientes';
    }

    listar(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    obterPorId(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }

    salvar(usuario: ClienteOutput): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, usuario);
    }

    atualizar(usuario: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${usuario.id}`, usuario);
    }

    excluir(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
