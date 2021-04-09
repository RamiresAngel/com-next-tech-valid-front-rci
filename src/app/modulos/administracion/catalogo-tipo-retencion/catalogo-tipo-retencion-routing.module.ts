import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTipoRetencionComponent } from './main-tipo-retencion/main-tipo-retencion.component';
import { ListTipoRetencionComponent } from './list-tipo-retencion/list-tipo-retencion.component';
import { FormTipoRetencionComponent } from './form-tipo-retencion/form-tipo-retencion.component';

const routes: Routes = [
  {
    path: '', component: MainTipoRetencionComponent, children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'prefix',
      },
      {
        path: 'list', component: ListTipoRetencionComponent
      },
      {
        path: 'add', component: FormTipoRetencionComponent
      },
      {
        path: 'edit/:id', component: FormTipoRetencionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoTipoRetencionRoutingModule { }
