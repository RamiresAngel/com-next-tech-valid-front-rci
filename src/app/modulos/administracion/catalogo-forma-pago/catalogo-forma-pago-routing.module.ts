import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCatalogoFormaPagoComponent } from './main-catalogo-forma-pago/main-catalogo-forma-pago.component';
import { FormCatalogoFormaPagoComponent } from './form-catalogo-forma-pago/form-catalogo-forma-pago.component';
import { ListCatalogoFormaPagoComponent } from './list-catalogo-forma-pago/list-catalogo-forma-pago.component';

const routes: Routes = [
  {
    path: '', component: MainCatalogoFormaPagoComponent, children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'prefix'
      },
      {
        path: 'list', component: ListCatalogoFormaPagoComponent
      },
      {
        path: 'add', component: FormCatalogoFormaPagoComponent
      },
      {
        path: 'edit/:id', component: FormCatalogoFormaPagoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoFormaPagoRoutingModule { }
