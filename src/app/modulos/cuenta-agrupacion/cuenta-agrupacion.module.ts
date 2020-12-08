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
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModuleModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Select2Module,
    DataTablesModule
  ],
  declarations: [CuentaAgrupacionMainComponent, FormularioCuentaAgrupacionComponent, FormularioCuentaAgrupacionMxComponent, ListCuentaAgrupacionMxComponent, ListCuentaAgrupacionComponent]
})
export class CuentaAgrupacionModule { }
