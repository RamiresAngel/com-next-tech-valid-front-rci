import { FormularioDepartamentoComponent } from './formulario-departamento/formulario-departamento.component';
import { ListDepartamentoComponent } from './list-departamento/list-departamento.component';
import { MainDepartamentoComponent } from './main-departamento/main-departamento.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainDepartamentoComponent,
    children: [
      { path: '', component: ListDepartamentoComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioDepartamentoComponent, canActivate: [AuthorizatedGuard] },
      {
        path: 'edit/:id_departamento',
        component: FormularioDepartamentoComponent
        , canActivate: [AuthorizatedGuard]
      },
      { path: '**', component: ListDepartamentoComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
