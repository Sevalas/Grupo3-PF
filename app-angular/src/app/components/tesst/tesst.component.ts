import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tesst',
  templateUrl: './tesst.component.html',
  styleUrls: ['./tesst.component.css']
})
export class TesstComponent implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder,) {
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

  user:string;
  pass:string;

  Login(){
    if(this.user === 'admin' && this.pass === 'admin'){
      this.router.navigate(['/tablero']);
    }
  }



  slides = [{'image': '../../../assets/imagenes/cat3.jpg'}, {'image': '../../../assets/imagenes/dog.jpg'},{'image': '../../../assets/imagenes/cat.jpg'}, {'image': '../../../assets/imagenes/dog2.jpg'}, {'image': '../../../assets/imagenes/cat2.jpg'}];

}
