import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PetExpoComponent } from './components/pet-expo/pet-expo.component';
import { PublicarPetComponent } from './components/publicar-pet/publicar-pet.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'tablero',
    component: PetExpoComponent
  },
  {
    path: 'registro_mascotas',
    component: PublicarPetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
