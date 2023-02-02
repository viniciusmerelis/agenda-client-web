import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Designer} from "../model/designer.model";

@Injectable({
    providedIn: 'root'
})
export class DesignerService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl + '/designers';
    }

    listar(): Observable<Designer[]> {
        return this.http.get<Designer[]>(this.apiUrl);
    }

    obterPorId(id: number): Observable<Designer> {
        return this.http.get<Designer>(`${this.apiUrl}/${id}`);
    }

    salvar(designer: Designer): Observable<Designer> {
        return this.http.post<Designer>(this.apiUrl, designer);
    }

    atualizar(designer: Designer): Observable<Designer> {
        return this.http.put<Designer>(`${this.apiUrl}/${designer.id}`, designer);
    }

    inativar(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
