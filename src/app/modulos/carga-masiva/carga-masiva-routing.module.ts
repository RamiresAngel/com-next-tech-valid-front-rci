import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCargaMasivaComponent } from './main-carga-masiva/main-carga-masiva.component';
import { ListCargaMasivaComponent } from './list-carga-masiva/list-carga-masiva.component';
import { FormularioCargaMasivaComponent } from './formulario-carga-masiva/formulario-carga-masiva.component';
import { DetalleLoteComponent } from './detalle-lote/detalle-lote.component';

const routes: Routes = [
  {
    path: '', component: MainCargaMasivaComponent, children: [
      {
        path: '', redirectTo: 'listar', pathMatch: 'prefix'
      },
      {
        path: 'listar', component: ListCargaMasivaComponent
      },
      {
        path: 'cargar', component: FormularioCargaMasivaComponent
      },
      {
        path: 'detalle/:numero_lote', component: DetalleLoteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaMasivaRoutingModule { }
