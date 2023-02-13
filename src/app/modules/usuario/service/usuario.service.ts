import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario.model";
import {UsuarioOutput} from "../model/output/usuario-output.model";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/usuarios';
    }

    listar(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    obterPorId(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    salvar(usuario: UsuarioOutput): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    atualizar(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    }

    inativar(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
