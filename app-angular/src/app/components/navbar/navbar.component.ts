import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.getUsuarioFoto()
  }

  fotoUsuario: String;

  getUsuarioFoto() {
    this.usuarioService.obtenerFotoUsuario(parseInt(localStorage.getItem("idUsuario"))).subscribe(
      res => {
        this.fotoUsuario = res
      })
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
