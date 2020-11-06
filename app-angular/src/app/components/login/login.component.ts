import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
  user:string;
  pass:string;

  get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.registerForm.invalid) {
			return;
    }
    this.Login()
	}

  Login(){
    if(this.user === 'admin' && this.pass === 'admin'){
      this.router.navigate(['/tablero']);
    }
  }
}
