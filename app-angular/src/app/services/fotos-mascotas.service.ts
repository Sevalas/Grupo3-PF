import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosMascotasService {

  constructor(privatehttp: HttpClient) { }
  apiURL = 'http://localhost:8080/api/fotos_mascota';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
export interface fotos_mascota{mascota : number,
  foto : string
}
