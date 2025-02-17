import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {
  NgIf,
  NgFor,
  UpperCasePipe,
} from '@angular/common';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { RolesComponent } from './roles/roles.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateRefComponent } from './ng-template-ref/ng-template-ref.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { LocalidadDetailComponent } from './localidad-detail/localidad-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ContactoDetailComponent } from './contacto-detail/contacto-detail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Config } from 'datatables.net';
import { DataTablesResponse } from './datatables-response';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    UsuariosComponent,
    UsuarioDetailComponent,
    RolesComponent,
    ProvinciasComponent,
    NgTemplateRefComponent,
    LocalidadesComponent,
    LocalidadDetailComponent,
    ClientesComponent,
    ClienteDetailComponent,
    ContactosComponent,
    ContactoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    DataTablesModule,
    NgbModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }