import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSucursalPaisComponent } from './list-sucursal-pais/list-sucursal-pais.component';
import { FormularioSucursalPaisComponent } from './formulario-sucursal-pais/formulario-sucursal-pais.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { MainSucursalComponent } from './main-sucursal/main-sucursal.component';
import { ConfiguracionBuzonComponent } from './configuracion-buzon/configuracion-buzon.component';

const routes: Routes = [
  {
    path: '', component: MainSucursalComponent,
    children: [
      { path: '', component: ListSucursalPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'list', component: ListSucursalPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioSucursalPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioSucursalPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'configurar_buzon/:identificador', component: ConfiguracionBuzonComponent, canActivate: [AuthorizatedGuard] }
    ]
    , canActivate: [AuthorizatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
