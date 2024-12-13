import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guard/auth.guard'; // Importa el guardia de autenticación


import { UserListComponent } from './admin/user-list/user-list.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';

import { EspecialidadListComponent } from './admin/especialidad-list/especialidad-list.component';
import { EspecialidadCreateComponent } from './admin/especialidad-create/especialidad-create.component';
import { EspecialidadEditComponent } from './admin/especialidad-edit/especialidad-edit.component';


import { ConsultaExternaComponent } from './paciente/consulta-externa/consulta-externa.component';
import { PacienteResultadosComponent } from './paciente/resultados/resultados.component';

import { MedicosDisponiblesComponent } from './paciente/medicos-disponibles/medicos-disponibles.component';

import { BitacoraComponent } from './admin/bitacora/bitacora.component';

import { HorariosDisponiblesComponent } from './paciente/horarios-disponibles/horarios-disponibles.component';
import { FichaAtencionComponent } from './paciente/ficha-atencion/ficha-atencion.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },       // Ruta protegida
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },     // Ruta protegida
  { path: 'timetable', component: TimetableComponent, canActivate: [AuthGuard] }, // Ruta protegida

  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/users/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/users/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }


  },

  {
    path: 'admin/especialidades',
    component: EspecialidadListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin/especialidades/create',
    component: EspecialidadCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin/especialidades/edit/:idEspecialidad',
    component: EspecialidadEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin/bitacora',
    component: BitacoraComponent, // Asegúrate de importar BitacoraComponent arriba
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },


  {
    path: 'paciente/consultas',
    component: ConsultaExternaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PACIENTE'] },
  },
  {
    path: 'paciente/resultados',
    component: PacienteResultadosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PACIENTE'] },
  },
  {
    path: 'paciente/medicos-disponibles/:especialidadId',
    component: MedicosDisponiblesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PACIENTE'] },
  },
  {
    path: 'paciente/horarios-disponibles/:medicoId',
    component: HorariosDisponiblesComponent, // Asegúrate de crear e importar HorariosDisponiblesComponent
    canActivate: [AuthGuard],
    data: { roles: ['PACIENTE'] },
  },
  {
    path: 'paciente/ficha-atencion/:id',
    component: FichaAtencionComponent, // Asegúrate de crear e importar HorariosDisponiblesComponent
    canActivate: [AuthGuard],
    data: { roles: ['PACIENTE'] },
  },


  { path: '', redirectTo: 'inicio', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
