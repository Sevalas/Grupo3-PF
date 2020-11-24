import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota.model';
import { FotosMascotasService } from 'src/app/services/fotos-mascotas.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-pet-expo',
  templateUrl: './pet-expo.component.html',
  styleUrls: ['./pet-expo.component.css']
})
export class PetExpoComponent implements OnInit {

  listaMascotas: Mascota[]
  urlFotosMascotas = Array();

  constructor(private servicio: MascotasService, private servicioFotos: FotosMascotasService) { }

  ngOnInit(): void {
    if (localStorage.length !== 0) {
      this.servicio.listaMascotasFiltrada(parseInt(localStorage.getItem("idUsuario"))).subscribe(
        res => {
          this.listaMascotas = res;
          for (let mascota of this.listaMascotas) {
            this.servicioFotos.obtenerListaFotoMascotaPorMascota(mascota.idMascota).subscribe(res => {
              this.urlFotosMascotas.push(res[0].foto)
            })
          }
        })
    }
  }

seleccion = 'false';

data(data: string) {
  console.log(data)
}

}

