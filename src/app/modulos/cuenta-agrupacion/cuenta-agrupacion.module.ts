import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaAgrupacionMainComponent } from './cuenta-agrupacion-main/cuenta-agrupacion-main.component';
import { FormularioCuentaAgrupacionComponent } from './formulario-cuenta-agrupacion/formulario-cuenta-agrupacion.component';
import { FormularioCuentaAgrupacionMxComponent } from './formulario-cuenta-agrupacion-mx/formulario-cuenta-agrupacion-mx.component';
import { ListCuentaAgrupacionMxComponent } from './list-cuenta-agrupacion-mx/list-cuenta-agrupacion-mx.component';
import { ListCuentaAgrupacionComponent } from './list-cuenta-agrupacion/list-cuenta-agrupacion.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { DataTablesModule } from 'angular-datatables';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CompartidosModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Select2Module,
    DataTablesModule
  ],
  declarations: [CuentaAgrupacionMainComponent, FormularioCuentaAgrupacionComponent, FormularioCuentaAgrupacionMxComponent, ListCuentaAgrupacionMxComponent, ListCuentaAgrupacionComponent]
})
export class CuentaAgrupacionModule { }
