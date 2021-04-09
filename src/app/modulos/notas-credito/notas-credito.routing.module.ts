import { NotasCreditoMainComponent } from './notas-credito-main/notas-credito-main.component';
import { NotasCreditoComponent } from './notas-credito/notas-credito.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: NotasCreditoMainComponent,
    children: [
      { path: '', component: NotasCreditoComponent, canActivate: [AuthorizatedGuard] },
      { path: ':identificador', component: NotasCreditoComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasCreditoRoutingModule { }
