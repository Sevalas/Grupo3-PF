import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
    router.events.subscribe(val => {
      if (window.location.href === 'http://localhost:4200/registro' || window.location.href === 'http://localhost:4200/login' || window.location.href === 'http://localhost:4200/'){
      this.nav1 = true;
    }})

  }

  ngOnInit(): void {}

  nav1:boolean = false  

}
