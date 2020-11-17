import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tesst',
  templateUrl: './tesst.component.html',
  styleUrls: ['./tesst.component.css']
})
export class TesstComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private servicio: UsuarioService, private modalService: NgbModal) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNac: ['', Validators.required],
      correoE: ['', Validators.required, Validators.email],
      genero: ['', Validators.required],
      region: ['', Validators.required],
      comuna: ['', Validators.required,]
    });
  }
  ngOnInit(): void {
  }

  loginForm: FormGroup;
  registerForm: FormGroup;
  loginSubmitted = false;
  registerSubmitted = false;
  hide = true;
  user: string;
  pass: string;
  noExiste = false;
  CredencialesIncorrectas = false;
  closeResult = '';
  regionSeleccionada = null;
  cambioDeRegion = null;
  comunaSeleccionada = null;
  listaDeColumnas: String[];
  slides = [{ 'image': '../../../assets/imagenes/cat3.jpg' }, { 'image': '../../../assets/imagenes/dog.jpg' }, { 'image': '../../../assets/imagenes/cat.jpg' }, { 'image': '../../../assets/imagenes/dog2.jpg' }, { 'image': '../../../assets/imagenes/cat2.jpg' }];

  get fLogin() { return this.loginForm.controls; }
  get fRegister() { return this.registerForm.controls; }

  registerOnSubmit() {
    this.registerSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.router.navigate(['/tablero']);
  }

  loginOnSubmit() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.Login()
  }

  Login() {
    this.servicio.loginCredenciales(this.user, this.pass).subscribe(respuesta => {
      console.log(respuesta)
      if (respuesta === null) {
        this.CredencialesIncorrectas = false;
        this.noExiste = true;
      }
      if (respuesta === false) {
        this.noExiste = false
        this.CredencialesIncorrectas = true;
      }
      if (respuesta === true) {
        this.noExiste = false
        this.CredencialesIncorrectas = false;
        this.router.navigate(['/tablero']);
      }
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  filtroComuna() {
		if (this.cambioDeRegion != this.regionSeleccionada) {
			this.listaDeColumnas = this.regionesYcomunas.find(x => x.NombreRegion == this.regionSeleccionada).comunas
			this.comunaSeleccionada = null;
		}
		else {
			this.cambioDeRegion = this.regionSeleccionada
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
