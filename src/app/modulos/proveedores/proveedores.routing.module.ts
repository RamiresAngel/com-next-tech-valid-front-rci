import { RelacionContribuyenteProveedorComponent } from './relacion-contribuyente-proveedor/relacion-contribuyente-proveedor.component';
import { CuentasProveedoresComponent } from './cuentas-proveedores/cuentas-proveedores.component';
import { TipoGastoProveedoresComponent } from './tipo-gasto-proveedores/tipo-gasto-proveedores.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { DepartamentosProveedoresComponent } from './departamentos-proveedores/departamentos-proveedores.component';
import { FormularioProveedoresPaisComponent } from './formulario-proveedores-pais/formulario-proveedores-pais.component';
import { ListProveedoresPaisComponent } from './list-proveedores-pais/list-proveedores-pais.component';
import { MainProveedoresComponent } from './main-proveedores/main-proveedores.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainProveedoresComponent,
    children: [
      { path: '', component: ListProveedoresPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: ListProveedoresPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id', component: FormularioProveedoresPaisComponent, canActivate: [AuthorizatedGuard] },
      { path: 'editDep/:id', component: DepartamentosProveedoresComponent, canActivate: [AuthorizatedGuard] },
      { path: 'editEstadoCuenta/:id', component: EstadoCuentaComponent, canActivate: [AuthorizatedGuard] },
      { path: 'tipo_gasto/:id', component: TipoGastoProveedoresComponent, canActivate: [AuthorizatedGuard] },
      { path: 'cuenta/:id', component: CuentasProveedoresComponent, canActivate: [AuthorizatedGuard] },
      { path: 'contribuyentes/:id', component: RelacionContribuyenteProveedorComponent, canActivate: [AuthorizatedGuard] },
      { path: '**', component: ListProveedoresPaisComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
