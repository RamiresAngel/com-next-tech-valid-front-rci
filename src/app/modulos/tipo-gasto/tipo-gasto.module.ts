import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTipoGastoComponent } from './main-tipo-gasto/main-tipo-gasto.component';
import { ListTipoGastoPaisComponent } from './list-tipo-gasto-pais/list-tipo-gasto-pais.component';
import { ListTipoGastoMxComponent } from './list-tipo-gasto-mx/list-tipo-gasto-mx.component';
import { FormularioTipoGastoMxComponent } from './formulario-tipo-gasto-mx/formulario-tipo-gasto-mx.component';
import { FormularioTipoGastoPaisComponent } from './formulario-tipo-gasto-pais/formulario-tipo-gasto-pais.component';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { customCurrencyMaskConfig } from '../flujo-aprobacion/flujo-aprobacion.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { ListTipoGastosRciComponent } from './list-tipo-gastos-rci/list-tipo-gastos-rci.component';
import { ListRerlacionesRciComponent } from './list-rerlaciones-rci/list-rerlaciones-rci.component';
import { FormularioTipoGastoRciComponent } from './formulario-tipo-gasto-rci/formulario-tipo-gasto-rci.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Select2Module,
    CompartidosModule,
    DirectivasModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [MainTipoGastoComponent, ListTipoGastoPaisComponent, ListTipoGastoMxComponent, FormularioTipoGastoMxComponent, FormularioTipoGastoPaisComponent, ListTipoGastosRciComponent, ListRerlacionesRciComponent, FormularioTipoGastoRciComponent]
})
export class TipoGastoModule { }
