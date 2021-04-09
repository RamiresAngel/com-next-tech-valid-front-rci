import { ListPrestacionesComponent } from './list-prestaciones/list-prestaciones.component';
import { FormularioPrestacionesComponent } from './formulario-prestaciones/formulario-prestaciones.component';
import { MainPrestacionesComponent } from './main-prestaciones/main-prestaciones.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';


const routes: Routes = [
  {
    path: '', component: MainPrestacionesComponent,
    children: [
      { path: '', component: ListPrestacionesComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioPrestacionesComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioPrestacionesComponent, canActivate: [AuthorizatedGuard] },
      { path: '**', component: ListPrestacionesComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestacionesRoutingModule { }
