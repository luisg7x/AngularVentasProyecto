import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from '../models/response';
import { Usuario } from "../models/usuario";
import { Login } from "../models/login";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ApiAuthService {
    url: string = "https://localhost:5001/api/User/login";

    private usuarioSubject: BehaviorSubject<Usuario>;

    public usuario: Observable<Usuario>;

    public get usuarioData(): Usuario{
        return this.usuarioSubject.value;
    }

    constructor(private http: HttpClient){
        this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
        this.usuario = this.usuarioSubject.asObservable();
    }

    login(login: Login): Observable<Response>{
        let httpHeader = new HttpHeaders()
        .append('Email', login.email)
        .append('Password', login.password)
    

        return this.http.post<Response>(this.url, {},{
        headers: httpHeader, 
        responseType: 'json'
        }).pipe(map(res => {
            if(res.exito === 1){
                const usuario : Usuario = res.data;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                this.usuarioSubject.next(usuario);
            }
            return res;
        }));
    }

    logout(){
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null!);
    }

}