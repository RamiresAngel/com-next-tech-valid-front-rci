import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'otros_gastos', pathMatch: 'prefix'
  // },
  {
    path: 'otros_gastos', loadChildren: './otros-gastos/otros-gastos.module#OtrosGastosModule'
  },
  {
    path: 'prestaciones', loadChildren: './prestaciones/prestaciones.module#PrestacionesModule'
  },
  {
    path: 'caja_chica', loadChildren: './caja_chica/caja-chica.module#CajaChicaModule'
  },
  {
    path: 'gastos_viaje', loadChildren: './gastos_viajes/gastos-viajes.module#GastosViajesModule'
  },
  {
    path: 'reporte_gastos', loadChildren: './reporte-gastos/reporte-gastos.module#ReporteGastosModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobacionesGastosRoutingModule { }
