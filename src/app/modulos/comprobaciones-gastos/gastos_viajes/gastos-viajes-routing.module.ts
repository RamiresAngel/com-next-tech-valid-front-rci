import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosViajesFormComponent } from './gastos-viajes-form/gastos-viajes-form.component';
import { GastosViajesListComponent } from './gastos-viajes-list/gastos-viajes-list.component';
import { GastosViajesMainComponent } from './gastos-viajes-main/gastos-viajes-main.component';

const routes: Routes = [
  {
    path: '', component: GastosViajesMainComponent, children: [
      {
        path: '', component: GastosViajesListComponent
      },
      {
        path: 'add', component: GastosViajesFormComponent
      },
      {
        path: 'edit/:identificador', component: GastosViajesFormComponent
      },
      {
        path: 'aprobacion/:identificador', component: GastosViajesFormComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosViajesRoutingModule { }
