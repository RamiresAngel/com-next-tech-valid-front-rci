import { FormComprobacionesPaisComponent } from './comprobaciones/form-comprobaciones-pais/form-comprobaciones-pais.component';
import { ListComprobacionesPaisComponent } from './comprobaciones/list-comprobaciones-pais/list-comprobaciones-pais.component';
import { FormComprobacionesMxComponent } from './comprobaciones/form-comprobaciones-mx/form-comprobaciones-mx.component';
import { MainGastosViajeComponent } from './main-gastos-viaje/main-gastos-viaje.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComprobacionesMxComponent } from './comprobaciones/list-comprobaciones-mx/list-comprobaciones-mx.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'comprobacion', pathMatch: 'prefix'
  },
  {
    path: 'comprobacion', component: MainGastosViajeComponent, children: [

      {
        path: '', redirectTo: 'list', pathMatch: 'prefix'
      },
      {
        path: 'list', component: ListComprobacionesPaisComponent
      },
      {
        path: 'add', component: FormComprobacionesPaisComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosViajeRoutingModule { }
