import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota.model';
import { Postulacion } from 'src/app/interfaces/postulacion.model';
import { FotosMascotasService } from 'src/app/services/fotos-mascotas.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { PostulacionesService } from 'src/app/services/postulaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-panel-de-usuario',
  templateUrl: './panel-de-usuario.component.html',
  styleUrls: ['./panel-de-usuario.component.css']
})
export class PanelDeUsuarioComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective
  constructor(private servicioPostulaciones: PostulacionesService, private servicioUsuarios: UsuarioService, private servicioMascotas: MascotasService, private servicioFotos: FotosMascotasService, private router: Router, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("idUsuario") == null) {
      this.router.navigateByUrl("/")
    }
    this.getPostulacionesEntrantes()
    this.getMascotasPorCuidador()
    this.getPostulacionesPorUsuario()
    this.actualizaMascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      requisitos: ['', [Validators.required]],
      infoAdicional: ['', []],
      imgMascota: ['', [Validators.required]]
    })
    this.actualizaPostulacionForm = this.formBuilder.group({
      pregunta1: ['', [Validators.required]],
      pregunta2: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      urlImg: ['',[]]
    })
  }

  PostulacionesEntrantes: Array<object>;
  MascotasPorCuidador: Array<object>;
  PostulacionesPorUsuario: Array<object>;
  imageObject = Array<object>();
  currentIndex: any = -1;
  showFlag: boolean = false;
  loading: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  aceptada: boolean = false;
  rechazada: boolean = false;
  emptyPostulacionEntrante: boolean = false;
  emptyMascotasPorCuidador: boolean = false;
  emptyPostulacionPorUsuario: boolean = false;

  actualizaMascotaForm: FormGroup;
  actualizaMascotaSubmitted = false;
  get fActualizaMascota() { return this.actualizaMascotaForm.controls; }
  fotoMascota = null;
  fechaActual = new Date();
  idMascota = 0;
  nombreMascota = "";
  idFoto = 0;
  setDatosMascota(idMascota: number, nombre: string,idFoto: number) { this.actualizaMascotaForm.reset(); this.formDirective.resetForm(); this.idMascota = idMascota; this.nombreMascota = nombre; this.idFoto = idFoto }

  actualizaPostulacionForm: FormGroup;
  actualizaPostulacionSubmitted = false;
  get fActualizaPostulacion() { return this.actualizaPostulacionForm.controls; }
  fotoRef = fetch('assets/imagenes/FotoRef.jpg').then(res => res.blob());
  idPostulacion = 0;
  nombreMascota2 = "";
  idMascota2 = 0;
  setDatosPostulacion(idPostulacion: number, nombre:string, idMascota: number) { this.actualizaPostulacionForm.reset(); this.formDirective.resetForm(); this.fotoRef = fetch('assets/imagenes/FotoRef.jpg').then(res => res.blob()); this.idPostulacion = idPostulacion; this.nombreMascota2 = nombre; this.idMascota2 = idMascota }

  actualizaMascotaOnSubmit() {
    this.actualizaMascotaSubmitted = true;
    if (this.actualizaMascotaForm.invalid) {
      return;
    }
    this.actualizarMascota()
  }

  actualizaPostulacionOnSubmit() {
    this.actualizaPostulacionSubmitted = true;
    if (this.actualizaPostulacionForm.invalid) {
      return;
    }
    this.actualizarPostulacion()
  }

  closeModal() { this.aceptada = false, this.rechazada = false }

  actualizarEstado(id: number, estado: boolean, idPostulante: number) {
    this.loading = true;
    this.servicioPostulaciones.actualizarEstado(id, estado, parseInt(localStorage.getItem("idUsuario")), idPostulante).subscribe(
      res => {
        this.getPostulacionesEntrantes()
        this.cdr.detectChanges()
        this.loading = false;
        if (estado) {
          this.rechazada = false;
          this.aceptada = true;
        }
        else if (!estado) {
          this.aceptada = false;
          this.rechazada = true
        }
      })
  }

  actualizarMascota() {
    
    this.loading2 = true;
    const formData = new FormData();
    var mascota: Mascota = {
      idMascota: 0,
      nombre: this.actualizaMascotaForm.get('nombre').value,
      cuidador: parseInt(localStorage.getItem("idUsuario")),
      especie: this.actualizaMascotaForm.get('especie').value,
      raza: this.actualizaMascotaForm.get('raza').value,
      edad: this.actualizaMascotaForm.get('edad').value,
      requisitos: this.actualizaMascotaForm.get('requisitos').value,
      fechaDePublicacion: `${this.fechaActual.getFullYear()}-${this.fechaActual.getMonth() + 1}-${this.fechaActual.getDate()}`,
      sexo: this.actualizaMascotaForm.get('sexo').value,
      infoAdicional: this.actualizaMascotaForm.get('infoAdicional').value
    }
    this.servicioMascotas.actualizarMascota(this.idMascota,mascota).subscribe(
      async res=>{
        formData.append(
          'imagen', await this.fotoMascota)
        this.servicioFotos.actualizarFotoMascota(this.idFoto,formData).subscribe(
          res =>{
            this.loading2 = false;
            document.getElementById('editarMascotaModal').click();
            this.getMascotasPorCuidador()
            this.cdr.detectChanges()
          }
        )
      })
  }

  eliminarMascota(){
    this.loading3 = true;
    this.servicioMascotas.eliminarMascota(this.idMascota).subscribe(
      res=>{
        this.loading3 = false;
        document.getElementById('eliminarMascotaModal').click();
        this.getMascotasPorCuidador()
        this.cdr.detectChanges()
      }
    )
  }

  eliminarPostulacion(){
    this.loading4 = true;
    this.servicioPostulaciones.eliminarPostulacion(this.idPostulacion).subscribe(
      res=>{
        this.loading4 = false;
        document.getElementById('eliminarPostulacionModal').click();
        this.getPostulacionesPorUsuario()
        this.cdr.detectChanges()
      }
    )
  }

  async actualizarPostulacion(){
    this.loading3 = true;
    const formData = new FormData();
    var postulacion:Postulacion = {
      idPostulaciones: 0,
      usuario: parseInt(localStorage.getItem("idUsuario")),
      pregunta1: this.actualizaPostulacionForm.get('pregunta1').value,
      pregunta2: this.actualizaPostulacionForm.get('pregunta2').value,
      descripcion: this.actualizaPostulacionForm.get('descripcion').value,
      fotoRefUrl: '',
      mascota: this.idMascota,
      estado: ''
    }
    for (var key in postulacion) {
      formData.append(
        key, postulacion[key]
      )
      formData.append(
        'imagen', await this.fotoRef) 
    }
    this.servicioPostulaciones.actualizarPostulacion(this.idPostulacion,formData).subscribe(
      res=>{
        this.loading3 = false;
        document.getElementById('editarPostulacionModal').click();
        this.getPostulacionesPorUsuario()
        this.cdr.detectChanges()
      }
    )
  }

  getPostulacionesEntrantes() {
    this.PostulacionesEntrantes = [];
    this.servicioPostulaciones.obtenerListaPostulacionesFiltrada(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      resPost => {
        if (resPost.length < 1) { this.emptyPostulacionEntrante = true; }
        for (let mascota of resPost) {
          this.servicioMascotas.obtenerMascotaPorId(mascota.mascota).subscribe(
            resMasc => {
              this.servicioUsuarios.obtenerUsuariosPorId(mascota.usuario).subscribe(
                resUsu => {
                  var postulacion = {
                    idPostulaciones: mascota.idPostulaciones,
                    usuario: mascota.usuario,
                    pregunta1: mascota.pregunta1,
                    pregunta2: mascota.pregunta2,
                    descripcion: mascota.descripcion,
                    fotoRefUrl: mascota.fotoRefUrl,
                    mascota: mascota.mascota,
                    estado: mascota.estado,
                    nombreMascota: resMasc.nombre,
                    nickUsuario: resUsu.nickname,
                  }
                  this.PostulacionesEntrantes.push(postulacion)
                })
            }
          )
        }
      })
  }

  getMascotasPorCuidador() {
    this.MascotasPorCuidador = [];
    this.servicioMascotas.obtenerMascotasPorCuidador(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      res => {
        if (res.length < 1) { this.emptyMascotasPorCuidador = true; }
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
              imgUrl: res[0].foto,
              imgId: res[0].idFotosMascotas
            }
            this.MascotasPorCuidador.push(pet)
          })
        }
      })
  }

  getPostulacionesPorUsuario() {
    this.PostulacionesPorUsuario = [];
    this.servicioPostulaciones.obtenerPostulacionPorUsuario(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      res => {
        if (res.length < 1) { this.emptyPostulacionPorUsuario = true; }
        for (let mascota of res) {
          this.servicioMascotas.obtenerMascotaPorId(mascota.mascota).subscribe(
            resMasc => {
              var postulacion = {
                idPostulaciones: mascota.idPostulaciones,
                usuario: mascota.usuario,
                pregunta1: mascota.pregunta1,
                pregunta2: mascota.pregunta2,
                descripcion: mascota.descripcion,
                fotoRefUrl: mascota.fotoRefUrl,
                mascota: mascota.mascota,
                estado: mascota.estado,
                nombreMascota: resMasc.nombre,
              }
              this.PostulacionesPorUsuario.push(postulacion)
            })
        }
      })
  }

  showLightbox(index, imgUrl) {
    this.imageObject.push({ image: imgUrl })
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
    this.imageObject = []
  }

  uploadImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoMascota = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadImg2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoRef = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
