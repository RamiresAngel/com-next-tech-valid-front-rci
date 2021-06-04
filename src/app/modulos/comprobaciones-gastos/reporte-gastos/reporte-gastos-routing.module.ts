import { ReporteListComponent } from './reporte-list/reporte-list.component';
import { ReporteMainComponent } from './reporte-main/reporte-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ReporteMainComponent, children: [
      {
        path: '', component: ReporteListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteGastosRoutingModule { }
