import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PublicarPetComponent } from './components/publicar-pet/publicar-pet.component';
import { PetExpoComponent } from './components/pet-expo/pet-expo.component';
import { PetPostulaComponent } from './components/pet-postula/pet-postula.component';
import { PanelDeUsuarioComponent } from './components/panel-de-usuario/panel-de-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TesstComponent } from './components/tesst/tesst.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialFileInputModule } from 'ngx-mat-file-input';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PublicarPetComponent,
    PetExpoComponent,
    PetPostulaComponent,
    PanelDeUsuarioComponent,
    TesstComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    MaterialFileInputModule,
    CustomFormsModule,
    NgImageFullscreenViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
