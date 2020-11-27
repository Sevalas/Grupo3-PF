import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  encapsulation: ViewEncapsulation.None
  constructor(private servicioPostulaciones: PostulacionesService, private servicioUsuarios: UsuarioService, private servicioMascotas: MascotasService, private servicioFotos: FotosMascotasService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (localStorage.getItem("idUsuario") == null) {
      this.router.navigateByUrl("/")
    }
    this.getPostulacionesEntrantes()
    this.getMascotasPorCuidador()
    this.getPostulacionesPorUsuario()
  }

  PostulacionesEntrantes: Array<object>;
  MascotasPorCuidador: Array<object>;
  PostulacionesPorUsuario: Array<object>;
  imageObject = Array<object>();
  currentIndex: any = -1;
  showFlag: boolean = false;
  loading: boolean = false;
  aceptada: boolean = false;
  rechazada: boolean = false;
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

  getPostulacionesEntrantes() {
    this.PostulacionesEntrantes = [];
    this.servicioPostulaciones.obtenerListaPostulacionesFiltrada(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      resPost => {
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
            this.MascotasPorCuidador.push(pet)
          })
        }
      })
  }

  getPostulacionesPorUsuario() {
    this.PostulacionesPorUsuario = [];
    this.servicioPostulaciones.obtenerPostulacionPorUsuario(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      res => {
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

  trackByPostulacionesEntrantes(index, postulacionesEntrantes) {
    return postulacionesEntrantes.idPostulaciones;
  }

}
