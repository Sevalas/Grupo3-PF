import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota.model';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-pet-expo',
  templateUrl: './pet-expo.component.html',
  styleUrls: ['./pet-expo.component.css']
})
export class PetExpoComponent implements OnInit {


  constructor(private servicio: MascotasService) { }

  ngOnInit(): void {
    if (localStorage.length !== 0) {
      this.servicio.listaMascotasFiltrada(parseInt(localStorage.getItem("idUsuario"))).subscribe(
        res => {
          console.log(res)
          this.listaMascotas = res;
        })
    }
  }

  listaMascotas: Mascota[];
  seleccion = 'false';

  data(data: string) {
    console.log(data)
  }
}

