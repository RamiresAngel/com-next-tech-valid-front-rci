import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestacionesFormComponent } from './prestaciones-form/prestaciones-form.component';
import { PrestacionesListComponent } from './prestaciones-list/prestaciones-list.component';
import { PrestacionesMainComponent } from './prestaciones-main/prestaciones-main.component';

const routes: Routes = [
  {
    path: '', component: PrestacionesMainComponent, children: [
      {
        path: '', component: PrestacionesListComponent
      },
      {
        path: 'add', component: PrestacionesFormComponent
      },
      {
        path: 'edit/:identificador', component: PrestacionesFormComponent
      },
      {
        path: 'aprobacion/:identificador', component: PrestacionesFormComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestacionesRoutingModule { }
