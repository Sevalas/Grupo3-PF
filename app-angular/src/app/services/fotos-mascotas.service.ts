import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';
import { FotoMascota } from '../interfaces/foto-mascota.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosMascotasService {

  constructor(private http: HttpClient) { }
  apiURL = 'http://localhost:8080/api/fotos_mascota';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  obtenerListaFotoMascotaPorMascota(idMascota:number): Observable<FotoMascota[]>{
    return this.http.get<FotoMascota[]>(`${this.apiURL}/mascota=${idMascota}`) 
  }
}
