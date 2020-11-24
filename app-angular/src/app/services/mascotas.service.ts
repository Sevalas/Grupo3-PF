import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import { Mascota } from '../interfaces/mascota.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8080/api/mascotas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
  };

  obtenerListaMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.apiURL}`)
  }
  listaMascotasFiltrada(usuario:number): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.apiURL}/filtrada=${usuario}`)
  }
}
