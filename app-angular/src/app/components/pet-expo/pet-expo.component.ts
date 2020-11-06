import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pet-expo',
  templateUrl: './pet-expo.component.html',
  styleUrls: ['./pet-expo.component.css']
})
export class PetExpoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  seleccion = false;

  Mascota: PeriodicElement[] = [
    {nombre: 'Snoopy', dueno: 'Sevalas', foto: 'https://images-na.ssl-images-amazon.com/images/I/71-EeSx9gGL._AC_SL1500_.jpg', edad: '3 años', especie: 'Perro',raza: 'Beagle',informacionAdicional: 'Snoopy no duerme dentro de la casita porque sufre claustrofobia.', requisitos: 'Ser Carlitos',fecha:'05/11/2020'},
    {nombre: 'Snoopy', dueno: 'Sevalas', foto: 'https://images-na.ssl-images-amazon.com/images/I/71-EeSx9gGL._AC_SL1500_.jpg', edad: '3 años', especie: 'Perro',raza: 'Beagle',informacionAdicional: 'Snoopy no duerme dentro de la casita porque sufre claustrofobia.', requisitos: 'Ser Carlitos',fecha:'05/11/2020'},
    {nombre: 'Snoopy', dueno: 'Sevalas', foto: 'https://images-na.ssl-images-amazon.com/images/I/71-EeSx9gGL._AC_SL1500_.jpg', edad: '3 años', especie: 'Perro',raza: 'Beagle',informacionAdicional: 'Snoopy no duerme dentro de la casita porque sufre claustrofobia.', requisitos: 'Ser Carlitos',fecha:'05/11/2020'},
    {nombre: 'Snoopy', dueno: 'Sevalas', foto: 'https://images-na.ssl-images-amazon.com/images/I/71-EeSx9gGL._AC_SL1500_.jpg', edad: '3 años', especie: 'Perro',raza: 'Beagle',informacionAdicional: 'Snoopy no duerme dentro de la casita porque sufre claustrofobia.', requisitos: 'Ser Carlitos',fecha:'05/11/2020'},
    {nombre: 'Snoopy', dueno: 'Sevalas', foto: 'https://images-na.ssl-images-amazon.com/images/I/71-EeSx9gGL._AC_SL1500_.jpg', edad: '3 años', especie: 'Perro',raza: 'Beagle',informacionAdicional: 'Snoopy no duerme dentro de la casita porque sufre claustrofobia.', requisitos: 'Ser Carlitos',fecha:'05/11/2020'},
  ]; 

}

  export interface PeriodicElement {
  nombre: string;
  dueno: string;
  foto: string;
  edad: string;
  especie: string;
  raza: string;
  informacionAdicional: string
  requisitos: string;
  fecha: string;
}


