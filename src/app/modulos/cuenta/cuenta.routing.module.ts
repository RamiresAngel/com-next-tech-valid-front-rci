import { FormularioCuentaComponent } from './formulario-cuenta/formulario-cuenta.component';
import { ListCuentaComponent } from './list-cuenta/list-cuenta.component';
import { MainCuentaComponent } from './main-cuenta/main-cuenta.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainCuentaComponent,
    children: [
      { path: '', component: ListCuentaComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioCuentaComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioCuentaComponent, canActivate: [AuthorizatedGuard] },
      { path: '**', component: ListCuentaComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
