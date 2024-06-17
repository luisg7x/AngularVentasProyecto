import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

let httpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json');


@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string = 'https://localhost:5001/api/Cliente';

  constructor(private _http: HttpClient) {
    
   }

   getClientes() : Observable<Response>{
      return this._http.get<Response>(this.url);
   }

   add(cliente: Cliente): Observable<Response>{
    return this._http.post<Response>(this.url, cliente, httpOption)
   }

   edit(cliente: Cliente): Observable<Response>{
    let httpParams = new HttpParams()
    .set('Id', cliente.id)
    .set('Nombre', cliente.nombre);

    /*let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('Id', cliente.id);
    params = params.append('Nombre', cliente.nombre);*/

    return this._http.put<Response>(this.url, {},{
        params: httpParams, 
        responseType: 'json'
      });
   }

   delete(id: number): Observable<Response>{
    let httpParams = new HttpParams()
    .set('Id', id)

    return this._http.delete<Response>(this.url,{
      params: httpParams, 
      responseType: 'json'
    });
   }
}

