import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajaChicaFormComponent } from './caja-chica-form/caja-chica-form.component';
import { CajaChicaListComponent } from './caja-chica-list/caja-chica-list.component';
import { CajaChicaMainComponent } from './caja-chica-main/caja-chica-main.component';

const routes: Routes = [
  {
    path: '', component: CajaChicaMainComponent, children: [
      {
        path: '', component: CajaChicaListComponent
      },
      {
        path: 'add', component: CajaChicaFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaChicaRoutingModule { }
