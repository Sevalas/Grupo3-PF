import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(privatehttp: HttpClient) { }
  apiURL = 'http://localhost:8080/api/mascotas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
export interface mascotas {nombre : String,
  cuidador : number, 
  especies : String,
   raza : String,
   edad : number,
   requisitos : String, 
  fechaDePublicacion : Date}