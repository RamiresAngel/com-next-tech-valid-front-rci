import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCatalogoImpuestosComponent } from './list-catalogo-impuestos/list-catalogo-impuestos.component';
import { FormCatalogoImpuestosComponent } from './form-catalogo-impuestos/form-catalogo-impuestos.component';
import { MainCatalogoImpuestosComponent } from './main-catalogo-impuestos/main-catalogo-impuestos.component';

const routes: Routes = [
  {
    path: '', component: MainCatalogoImpuestosComponent, children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'prefix',
      },
      {
        path: 'list', component: ListCatalogoImpuestosComponent
      },
      {
        path: 'add', component: FormCatalogoImpuestosComponent
      },
      {
        path: 'edit/:id', component: FormCatalogoImpuestosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoImpuestosRoutingModule { }
