import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FotoMascota } from 'src/app/interfaces/foto-mascota.model';
import { Mascota } from 'src/app/interfaces/mascota.model';
import { FotosMascotasService } from 'src/app/services/fotos-mascotas.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-publicar-pet',
  templateUrl: './publicar-pet.component.html',
  styleUrls: ['./publicar-pet.component.css']
})
export class PublicarPetComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective

  constructor(private router: Router,private formBuilder: FormBuilder,private servicioMascota: MascotasService,private servicioFotoMascota: FotosMascotasService) { }

  ngOnInit(): void {
    if(localStorage.getItem("idUsuario")==null){
      this.router.navigateByUrl("/")}
    this.publicaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      requisitos: ['', [Validators.required]],
      infoAdicional: ['', []],
      imgMascota: ['',[Validators.required]]
    })
  }

  publicaForm: FormGroup;
  publicaSubmitted = false;
  fechaActual = new Date();
  fotoMascota;
  loading: boolean = false;
  alertClosePublicacion: boolean = false;
  closeModal(){this.alertClosePublicacion = false}
  get fPublica() { return this.publicaForm.controls; }
  resetRegistroForm() { this.publicaForm.get('nombre').setValue(''), this.publicaForm.get('especie').setValue(''), this.publicaForm.get('raza').setValue(''), this.publicaForm.get('edad').setValue(''), this.publicaForm.get('sexo').setValue(''), this.publicaForm.get('requisitos').setValue(''), this.publicaForm.get('infoAdicional').setValue(''), this.publicaForm.get('imgMascota').setValue('')}

  uploadImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoMascota = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async publicaOnSubmit() {
    this.publicaSubmitted = true;
    if (this.publicaForm.invalid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    var mascota:Mascota = {
      idMascota: 0,
      nombre: this.publicaForm.get('nombre').value,
      cuidador: parseInt(localStorage.getItem("idUsuario")),
      especie: this.publicaForm.get('especie').value,
      raza: this.publicaForm.get('raza').value,
      edad: this.publicaForm.get('edad').value,
      requisitos: this.publicaForm.get('requisitos').value,
      fechaDePublicacion: this.fechaActual.toISOString().split('T')[0],
      sexo:this.publicaForm.get('sexo').value,
      infoAdicional:this.publicaForm.get('infoAdicional').value
    }
    this.servicioMascota.agregarMascota(mascota).subscribe(
      async res=>{
        var fotoMascota:FotoMascota = {
          idFotosMascotas:0,
          mascota:res,
          foto:''
        }
        for (var key in fotoMascota) {
          formData.append(
            key, fotoMascota[key]
          )
        }
        formData.append(
          'imagen', await this.fotoMascota)
        this.servicioFotoMascota.agregarFotoMascota(formData).subscribe(res=>{
          this.loading = false;
          this.publicaForm.reset();
          this.formDirective.resetForm();
          this.alertClosePublicacion = true;
        })
      }
    )
  }

}
