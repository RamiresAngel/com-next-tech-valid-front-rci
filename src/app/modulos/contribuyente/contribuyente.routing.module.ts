import { FormularioContribuyentePaisComponent } from './formulario-contribuyente-pais/formulario-contribuyente-pais.component';
import { ListContribuyentePaisComponent } from './list-contribuyente-pais/list-contribuyente-pais.component';
import { MainContribuyenteComponent } from './main-contribuyente/main-contribuyente.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainContribuyenteComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'prefix' },
      { path: 'list', component: ListContribuyentePaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioContribuyentePaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioContribuyentePaisComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContribuyenteRoutingModule { }
