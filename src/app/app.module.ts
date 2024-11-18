// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Asegúrate de tener HTTP_INTERCEPTORS importado aquí



// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Importa MatTooltipModule
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule si lo usas
import { MatSelectModule } from '@angular/material/select';



// Formularios y HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Routing y Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { RouterLinkActiveExactDirective } from './main/appRouterLinkActiveExact.directive';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { EspecialidadListComponent } from './admin/especialidad-list/especialidad-list.component';
import { EspecialidadCreateComponent } from './admin/especialidad-create/especialidad-create.component';
import { EspecialidadEditComponent } from './admin/especialidad-edit/especialidad-edit.component'; // Asegúrate de que está importado

import { ConsultaExternaComponent } from './paciente/consulta-externa/consulta-externa.component';
import { MedicosDisponiblesComponent } from './paciente/medicos-disponibles/medicos-disponibles.component';

import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { BitacoraComponent } from './admin/bitacora/bitacora.component';
import { HorariosDisponiblesComponent } from './paciente/horarios-disponibles/horarios-disponibles.component';
import { FichaAtencionComponent } from './paciente/ficha-atencion/ficha-atencion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    RouterLinkActiveExactDirective,
    ProfileComponent,
    TimetableComponent,
    InicioComponent,
    LoginComponent,
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    EspecialidadListComponent,
    EspecialidadCreateComponent,
    EspecialidadEditComponent,
    ConsultaExternaComponent,
    BitacoraComponent,
    MedicosDisponiblesComponent,
    HorariosDisponiblesComponent,
    FichaAtencionComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Importante para Angular Material
    // Angular Material Modules
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule, // Añade MatTooltipModule aquí
    MatTableModule,
    MatSnackBarModule, // Añade si usas MatSnackBar
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
