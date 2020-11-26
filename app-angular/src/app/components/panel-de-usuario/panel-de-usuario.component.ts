import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-panel-de-usuario',
  templateUrl: './panel-de-usuario.component.html',
  styleUrls: ['./panel-de-usuario.component.css']
})
export class PanelDeUsuarioComponent implements OnInit {
encapsulation: ViewEncapsulation.None
  constructor() { }

  ngOnInit(): void {
  }

}
