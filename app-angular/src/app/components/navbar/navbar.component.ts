import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
    router.events.subscribe(val => {
      if (window.location.href === 'http://localhost:4200/test'){
        this.nav = false;
      }
      if (window.location.href === 'http://localhost:4200/' || window.location.href === 'http://localhost:4200/registro') {
        this.nav2 = false;  
        this.nav1 = true;
      }
      if (window.location.href === 'http://localhost:4200/tablero' || window.location.href === 'http://localhost:4200/registro_mascotas' || window.location.href === 'http://localhost:4200/panelUsuario' || window.location.href === 'http://localhost:4200/postula') {
        this.nav1 = false; 
        this.nav2 = true;
      }
    })

  }

  ngOnInit(): void { }

  nav: boolean = true;
  nav1: boolean = false;
  nav2: boolean = false;

}
