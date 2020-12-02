import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder, private servicio: UsuarioService) { }

  ngOnInit(): void {
    if (localStorage.getItem("idUsuario") == null) {
      this.router.navigateByUrl("/")
    }
    this.setDatosUsuario()

  }

  actualizaUsuarioForm: FormGroup;
  actualizaUsuarioSubmitted = false;
  get fActualizaUsuario() { return this.actualizaUsuarioForm.controls; }
  checkNick = false;
  checkEmail = false;
  checkFono = false;
  fotoUrl;
  fotoPerfil = fetch('assets/imagenes/perfil.png').then(res => res.blob())
  hide = true;
  cambioDeRegion = null;
  comunaSeleccionada = null;
  listaDeColumnas: String[];
  actualPass: string;
  ready = false;
  loading = false;

  RegistroEmailOnKeydown(event) { this.checkEmail = false }
  RegistroNicknameOnKeydown(event) { this.checkNick = false }
  RegistroFonoOnKeydown(event) { this.checkFono = false }

  verificadoEdad(control: AbstractControl): { [key: string]: boolean } | null {
    if ((new Date().valueOf() - control.value.valueOf()) <= 473353890000.01) {
      return { 'verificadoEdad': true }
    }
    return null;
  }

  actualizaUsuarioOnSubmit() {
    this.actualizaUsuarioSubmitted = true;
    if (this.actualizaUsuarioForm.invalid) {
      return;
    }
    this.actualizarUsuario()
  }

  uploadDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPerfil = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  setDatosUsuario() {
    this.loading=true;
    this.servicio.obtenerUsuariosPorId(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      res => {
        var fecha = new Date(res.fechaNacimiento);
        fecha.setDate(fecha.getDate() + 1)
        this.actualizaUsuarioForm = this.formBuilder.group({
          usuario: [res.nickname, [Validators.required, Validators.minLength(7), Validators.pattern('(?!.*[\\.\\-\\_]{})^[a-zA-Z0-9\\.\\-\\_]{0,16}$')]],
          contrasenaActual: ['', [Validators.required, Validators.minLength(7), Validators.pattern(res.password)]],
          contrasenaNueva: ['', [Validators.required, Validators.minLength(7), Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{7,15})')]],
          nombre: [res.nombres, Validators.required,],
          apellido: [res.apellidos, Validators.required],
          fechaNac: [fecha, [Validators.required, this.verificadoEdad]],
          email: [res.email, [Validators.required, CustomValidators.email]],
          region: [res.region, Validators.required],
          comuna: [res.comuna, Validators.required],
          fono: [res.fono, [Validators.required, Validators.pattern('^(0?9)[987654321]\\d{7}$')]],
          img: ['', []]
        },
          { updateOn: 'blur' });
        this.fotoUrl = res.fotoPerfilUrl
        this.listaDeColumnas = this.regionesYcomunas.find(x => x.NombreRegion == this.actualizaUsuarioForm.get('region').value).comunas
        this.ready = true;
        this.loading=false;
      })
  }

  async actualizarUsuario() {
    var fotoUrl = '';
    if (!this.actualizaUsuarioForm.get('img').value) {
      fotoUrl = this.fotoUrl;
    }
    this.loading = true;
    var fechaNac: Date = this.actualizaUsuarioForm.get('fechaNac').value
    var usuario: Usuario = {
      idUsuario: 0,
      nickname: this.actualizaUsuarioForm.get('usuario').value,
      password: this.actualizaUsuarioForm.get('contrasenaNueva').value,
      nombres: this.actualizaUsuarioForm.get('nombre').value,
      apellidos: this.actualizaUsuarioForm.get('apellido').value,
      fechaNacimiento: fechaNac.toISOString().split('T')[0],
      email: this.actualizaUsuarioForm.get('email').value,
      fono: this.actualizaUsuarioForm.get('fono').value,
      region: this.actualizaUsuarioForm.get('region').value,
      comuna: this.actualizaUsuarioForm.get('comuna').value,
      fotoPerfilUrl: fotoUrl
    }
    const formData = new FormData();
    for (var key in usuario) {
      formData.append(
        key, usuario[key]
      )
    }
    formData.append(
      'imagen', await this.fotoPerfil)

    this.servicio.actualizarUsuario(parseInt(localStorage.getItem("idUsuario")), formData).subscribe(
      res => {
        if (res) {
          this.loading = false;
        }
        if (res === 'Este Nickname ya existe') {
          this.checkEmail = false;
          this.checkFono = false;
          this.checkNick = true;
        }
        if (res === 'Este Correo ya existe') {
          this.checkNick = false;
          this.checkFono = false;
          this.checkEmail = true;
        }
        if (res === 'Este Fono ya existe') {
          this.checkEmail = false;
          this.checkNick = false;
          this.checkFono = true;
        }
        if (res === 'Correo Enviado') {
          window.location.reload()
        }
      }
    )
  }

  filtroComuna() {
    if (this.cambioDeRegion != this.actualizaUsuarioForm.get('region').value) {
      this.listaDeColumnas = this.regionesYcomunas.find(x => x.NombreRegion == this.actualizaUsuarioForm.get('region').value).comunas
      this.actualizaUsuarioForm.get('comuna').setValue(null)
    }
    else {
      this.cambioDeRegion = this.actualizaUsuarioForm.get('region').value
    }
  }

  regionesYcomunas =
    [
      {
        "NombreRegion": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
      },
      {
        "NombreRegion": "Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
      },
      {
        "NombreRegion": "Antofagasta",
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
      },
      {
        "NombreRegion": "Atacama",
        "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
      },
      {
        "NombreRegion": "Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
      },
      {
        "NombreRegion": "Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
      },
      {
        "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
      },
      {
        "NombreRegion": "Región del Maule",
        "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
      },
      {
        "NombreRegion": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
      },
      {
        "NombreRegion": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",]
      },
      {
        "NombreRegion": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
      },
      {
        "NombreRegion": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
      },
      {
        "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
      },
      {
        "NombreRegion": "Región de Magallanes y de la AntárVca Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
      },
      {
        "NombreRegion": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
      }
    ]
}
