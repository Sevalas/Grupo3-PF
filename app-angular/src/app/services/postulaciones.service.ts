import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import { Observable } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.model';

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {
  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8080/api/postulaciones';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  agregarPostulacion(data:FormData) {
    return this.http.post(`${this.apiURL}`,data)
  }

  obtenerListaPostulacionesFiltrada(usuario:number): Observable<Postulacion[]>{
    return this.http.get<Postulacion[]>(`${this.apiURL}/filtrada=${usuario}`)
  }

  actualizarEstado(id:number,estado:boolean,idCuidador:number,idPostulante:number){
    return this.http.put(`${this.apiURL}/${id}_estado=${estado}_cuidador=${idCuidador}_postulante=${idPostulante}`,this.httpOptions)
  }

  obtenerPostulacionPorUsuario(usuario:number): Observable<Postulacion[]>{
    return this.http.get<Postulacion[]>(`${this.apiURL}/usuario=${usuario}`)
  }
}

