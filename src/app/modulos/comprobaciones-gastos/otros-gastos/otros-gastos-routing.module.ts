import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtrosGastosFormComponent } from './otros-gastos-form/otros-gastos-form.component';
import { OtrosGastosListComponent } from './otros-gastos-list/otros-gastos-list.component';
import { OtrosGastosMainComponent } from './otros-gastos-main/otros-gastos-main.component';

const routes: Routes = [
  {
    path: '', component: OtrosGastosMainComponent, children: [
      {
        path: '', component: OtrosGastosListComponent
      },
      {
        path: 'add', component: OtrosGastosFormComponent
      },
      {
        path: 'edit/:identificador', component: OtrosGastosFormComponent
      },
      {
        path: 'aprobacion/:identificador', component: OtrosGastosFormComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtrosGastosRoutingModule { }
