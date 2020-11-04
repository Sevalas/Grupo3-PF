import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {this.registerForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNac: ['', Validators.required],
    correoE: ['', Validators.required, Validators.email],
    genero: ['', Validators.required],
    region: ['', Validators.required],
    comuna: ['', Validators.required]
  });
  }

  registerForm: FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
  
    

}
