import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {
  constructor(privatehttp: HttpClient) { }
  apiURL = 'http://localhost:8080/api/postulaciones';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
