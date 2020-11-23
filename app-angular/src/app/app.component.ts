import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(event.urlAfterRedirects == '/'){
          this.navBar = false;
        }
        else if(event.urlAfterRedirects != '/'){
          this.navBar = true
        }
      }
    })
  }
  ngOnInit(){}

  navBar = false;
  title = 'PetAdopt';
}
