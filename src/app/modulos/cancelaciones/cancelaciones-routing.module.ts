import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSolicitudCancelacionesComponent } from './solicitudes/main-solicitud-cancelaciones/main-solicitud-cancelaciones.component';
import { MainCredencialesComponent } from './credenciales/main-credenciales/main-credenciales.component';
import { ListCredencialesComponent } from './credenciales/list-credenciales/list-credenciales.component';
import { FormCredencialesComponent } from './credenciales/form-credenciales/form-credenciales.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { ListSolicitudCancelacionesComponent } from './solicitudes/list-solicitud-cancelaciones/list-solicitud-cancelaciones.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'solicitud', pathMatch: 'prefix'
  },
  {
    path: 'solicitud', component: MainSolicitudCancelacionesComponent, children: [
      {
        path: '', component: ListSolicitudCancelacionesComponent, canActivate: [AuthorizatedGuard]
      }
    ]
  },
  {
    path: 'credenciales', component: MainCredencialesComponent, children: [
      {
        path: '', component: ListCredencialesComponent, canActivate: [AuthorizatedGuard]
      },
      {
        path: 'form', component: FormCredencialesComponent, canActivate: [AuthorizatedGuard]
      },
      {
        path: 'form/:identificador', component: FormCredencialesComponent, canActivate: [AuthorizatedGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelacionesRoutingModule { }
