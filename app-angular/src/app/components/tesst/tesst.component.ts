import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tesst',
  templateUrl: './tesst.component.html',
  styleUrls: ['./tesst.component.css']
})
export class TesstComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private servicio: UsuarioService) {
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  registerForm: FormGroup;
  submitted = false;
  hide = true;

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.Login()
  }

  user: string;
  pass: string;

  Login() {
    this.servicio.loginCredenciales(this.user, this.pass).subscribe(respuesta => {
      console.log(respuesta)
      if (respuesta === true) {
        this.router.navigate(['/tablero']);
      }
    })
  }




  slides = [{ 'image': '../../../assets/imagenes/cat3.jpg' }, { 'image': '../../../assets/imagenes/dog.jpg' }, { 'image': '../../../assets/imagenes/cat.jpg' }, { 'image': '../../../assets/imagenes/dog2.jpg' }, { 'image': '../../../assets/imagenes/cat2.jpg' }];

}
