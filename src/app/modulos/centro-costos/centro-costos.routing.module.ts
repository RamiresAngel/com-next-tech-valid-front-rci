import { FormularioCentroCostosPaisComponent } from './formulario-centro-costos-pais/formulario-centro-costos-pais.component';
import { ListCentroCostosPaisComponent } from './list-centro-costos-pais/list-centro-costos-pais.component';
import { MainCentroCostosComponent } from './main-centro-costos/main-centro-costos.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainCentroCostosComponent,
    children: [
      { path: '', component: ListCentroCostosPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'list', component: ListCentroCostosPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioCentroCostosPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioCentroCostosPaisComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroCostosRoutingModule { }
