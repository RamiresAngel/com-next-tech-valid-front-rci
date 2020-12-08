import { BolsaFlexibleListRciComponent } from './bolsa-flexible-list-rci/bolsa-flexible-list-rci.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BolsaFlexibleMainComponent } from './bolsa-flexible-main/bolsa-flexible-main.component';

const routes: Routes = [
  {
    path: '', component: BolsaFlexibleMainComponent, children:
      [
        {
          path: '', component: BolsaFlexibleListRciComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BolsaFlexibleRoutingModule { }
