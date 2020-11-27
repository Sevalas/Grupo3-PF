import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Postulacion } from 'src/app/interfaces/postulacion.model';
import { FotosMascotasService } from 'src/app/services/fotos-mascotas.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { PostulacionesService } from 'src/app/services/postulaciones.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-pet-expo',
  templateUrl: './pet-expo.component.html',
  styleUrls: ['./pet-expo.component.css']
})
export class PetExpoComponent implements OnInit {

  constructor(private router: Router,private servicio: MascotasService, private servicioFotos: FotosMascotasService, private servicioPostula: PostulacionesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("idUsuario")==null){
    this.router.navigateByUrl("/")}
    this.conectarMascotas();
    this.postulaForm = this.formBuilder.group({
      pregunta1: ['', [Validators.required]],
      pregunta2: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  listaMascotas = Array();
  urlFotosMascotas = Array();
  seleccion = 'false';
  postulaForm: FormGroup;
  postulaSubmitted = false;
  multiple: boolean = false;
  get fPostula() { return this.postulaForm.controls; }
  fotoRef = fetch('assets/imagenes/FotoRef.jpg').then(res => res.blob())
  idMascota = 0;
  nombreMascota = ""
  setDatosMascota(idMascota: number,nombre:string) { this.idMascota = idMascota; this.nombreMascota = nombre}
  imageObject = Array<object>();
  currentIndex: any = -1;
  showFlag: boolean = false;
  loading: boolean = false;

  conectarMascotas() {
    if (localStorage.length !== 0) {
      this.servicio.listaMascotasFiltrada(parseInt(localStorage.getItem("idUsuario"))).subscribe(
        res => {
          for (let mascota of res) {
            this.servicioFotos.obtenerListaFotoMascotaPorMascota(mascota.idMascota).subscribe(res => {
              var pet = {
                idMascota: mascota.idMascota,
                nombre: mascota.nombre,
                cuidador: mascota.cuidador,
                especie: mascota.especie,
                raza: mascota.raza,
                edad: mascota.edad,
                requisitos: mascota.requisitos,
                fechaDePublicacion: mascota.fechaDePublicacion,
                sexo: mascota.sexo,
                infoAdicional: mascota.infoAdicional,
                imgUrl: res[0].foto
              }
              this.listaMascotas.push(pet)
            })
          }
        })
    }
  }

  async postulaOnSubmit() {
    this.postulaSubmitted = true;
    if (this.postulaForm.invalid) {
      return;
    }
    this.loading = true;
    var postulacion: Postulacion = {
      idPostulaciones: 0,
      usuario: parseInt(localStorage.getItem("idUsuario")),
      pregunta1: this.postulaForm.get('pregunta1').value,
      pregunta2: this.postulaForm.get('pregunta2').value,
      descripcion: this.postulaForm.get('descripcion').value,
      fotoRefUrl: '',
      mascota: this.idMascota,
      estado: ''
    }
    const formData = new FormData();
    for (var key in postulacion) {
      formData.append(
        key, postulacion[key]
      )
    }
    formData.append(
      'imagen', await this.fotoRef)
    this.servicioPostula.agregarPostulacion(formData).subscribe(res => { console.log("funciona"), window.location.reload(); })
  }

  uploadImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoRef = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  showLightbox(index,imgUrl) {
    this.imageObject.push({image: imgUrl})
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
    this.imageObject = []
  }

}

