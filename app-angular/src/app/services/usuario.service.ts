import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8080/api/usuarios';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  loginCredenciales(usuario:string,password:string): Observable<Boolean>{
    return this.http.get<boolean>(`${this.apiURL}/login?nickname=${usuario}&password=${password}`)
  }
  
}

