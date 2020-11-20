import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8080/api/usuarios';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
  };
  

  loginCredenciales(nickname:string,password:string): Observable<Boolean>{
    return this.http.get<boolean>(`${this.apiURL}/login?nickname=${nickname}&password=${password}`)
  }
  
  agregarUsuario(Data:FormData): Observable<string>{
    return this.http.post(`${this.apiURL}/agregar`,Data,{ responseType: 'text',})
  }

  obtenerUsuariosPorNickname(usuario:String): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiURL}/nickname=${usuario}`)
  }
}

