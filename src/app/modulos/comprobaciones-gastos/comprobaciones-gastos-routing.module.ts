import { GastosViajesFormComponent } from './gastos_viajes/gastos-viajes-form/gastos-viajes-form.component';
import { GastosViajesListComponent } from './gastos_viajes/gastos-viajes-list/gastos-viajes-list.component';
import { GastosViajesMainComponent } from './gastos_viajes/gastos-viajes-main/gastos-viajes-main.component';
import { CajaChicaFormComponent } from './caja_chica/caja-chica-form/caja-chica-form.component';
import { CajaChicaListComponent } from './caja_chica/caja-chica-list/caja-chica-list.component';
import { CajaChicaMainComponent } from './caja_chica/caja-chica-main/caja-chica-main.component';
import { PrestacionesFormComponent } from './prestaciones/prestaciones-form/prestaciones-form.component';
import { PrestacionesListComponent } from './prestaciones/prestaciones-list/prestaciones-list.component';
import { PrestacionesMainComponent } from './prestaciones/prestaciones-main/prestaciones-main.component';
import { OtrosGastosMainComponent } from './otros-gastos/otros-gastos-main/otros-gastos-main.component';
import { OtrosGastosFormComponent } from './otros-gastos/otros-gastos-form/otros-gastos-form.component';
import { OtrosGastosListComponent } from './otros-gastos/otros-gastos-list/otros-gastos-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprobacionesMainComponent } from './comprobaciones-main/comprobaciones-main.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'otros_gastos', pathMatch: 'prefix'
  },
  {
    path: 'otros_gastos', component: OtrosGastosMainComponent, children: [
      {
        path: '', component: OtrosGastosListComponent
      },
      {
        path: 'add', component: OtrosGastosFormComponent
      }
    ]
  },
  {
    path: 'prestaciones', component: PrestacionesMainComponent, children: [
      {
        path: '', component: PrestacionesListComponent
      },
      {
        path: 'add', component: PrestacionesFormComponent
      }
    ]
  },
  {
    path: 'caja_chica', component: CajaChicaMainComponent, children: [
      {
        path: '', component: CajaChicaListComponent
      },
      {
        path: 'add', component: CajaChicaFormComponent
      }
    ]
  },
  {
    path: 'gastos_viaje', component: GastosViajesMainComponent, children: [
      {
        path: '', component: GastosViajesListComponent
      },
      {
        path: 'add', component: GastosViajesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobacionesGastosRoutingModule { }
