import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { PanelDeUsuarioComponent } from './components/panel-de-usuario/panel-de-usuario.component';
import { PetExpoComponent } from './components/pet-expo/pet-expo.component';
import { PublicarPetComponent } from './components/publicar-pet/publicar-pet.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tablero',
    component: PetExpoComponent
  },
  {
    path: 'registro_mascotas',
    component: PublicarPetComponent
  },
  {
    path: 'panelUsuario',
    component: PanelDeUsuarioComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
