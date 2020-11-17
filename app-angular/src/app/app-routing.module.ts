import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PanelDeUsuarioComponent } from './components/panel-de-usuario/panel-de-usuario.component';
import { PetExpoComponent } from './components/pet-expo/pet-expo.component';
import { PublicarPetComponent } from './components/publicar-pet/publicar-pet.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PetPostulaComponent } from './components/pet-postula/pet-postula.component';
import { TesstComponent } from './components/tesst/tesst.component';

const routes: Routes = [
  {
    path: '',
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
  },
  {
    path: 'postula',
    component: PetPostulaComponent
    
  },
  {
    path: 'panelUsuario',
    component: PanelDeUsuarioComponent
  },
  {
    path: 'test',
    component: TesstComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
