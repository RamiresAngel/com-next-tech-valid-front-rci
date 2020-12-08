import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCuentaComponent } from './list-cuenta/list-cuenta.component';
import { ListCuentaMxComponent } from './list-cuenta-mx/list-cuenta-mx.component';
import { FormularioCuentaMxComponent } from './formulario-cuenta-mx/formulario-cuenta-mx.component';
import { FormularioCuentaComponent } from './formulario-cuenta/formulario-cuenta.component';
import { MainCuentaComponent } from './main-cuenta/main-cuenta.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { CuentaRoutingModule } from './cuenta.routing.module';
import { FormularioCuentaRciComponent } from './formulario-cuenta-rci/formulario-cuenta-rci.component';
import { ListCuentaRciComponent } from './list-cuenta-rci/list-cuenta-rci.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Select2Module,
    SharedModuleModule,
    CuentaRoutingModule
  ],
  declarations: [
    ListCuentaComponent,
    ListCuentaMxComponent,
    FormularioCuentaMxComponent,
    FormularioCuentaComponent,
    MainCuentaComponent,
    FormularioCuentaRciComponent,
    ListCuentaRciComponent]
})
export class CuentaModule { }
