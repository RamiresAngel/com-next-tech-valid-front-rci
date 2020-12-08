import { PrestacionesFormComponent } from './prestaciones/prestaciones-form/prestaciones-form.component';
import { PrestacionesListComponent } from './prestaciones/prestaciones-list/prestaciones-list.component';
import { PrestacionesMainComponent } from './prestaciones/prestaciones-main/prestaciones-main.component';
import { OtrosGastosFormComponent } from './otros-gastos/otros-gastos-form/otros-gastos-form.component';
import { OtrosGastosListComponent } from './otros-gastos/otros-gastos-list/otros-gastos-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprobacionesMainComponent } from './comprobaciones-main/comprobaciones-main.component';
import { OtrosGastosMainComponent } from './otros-gastos/otros-gastos-main/otros-gastos-main.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobacionesGastosRoutingModule { }
