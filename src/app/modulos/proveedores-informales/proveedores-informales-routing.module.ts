import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedoresInformalesMainComponent } from './proveedores-informales-main/proveedores-informales-main.component';
import { ListProveedoresInformalesPaisComponent } from './list-proveedores-informales-pais/list-proveedores-informales-pais.component';
import { FormularioProveedoresInformalesPaisComponent } from './formulario-proveedores-informales-pais/formulario-proveedores-informales-pais.component';

const routes: Routes = [
  {
    path: '', component: ProveedoresInformalesMainComponent, children:
      [
        { path: '', redirectTo: 'list', pathMatch: 'prefix' },
        { path: 'list', component: ListProveedoresInformalesPaisComponent },
        { path: 'add', component: FormularioProveedoresInformalesPaisComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresInformalesRoutingModule { }
