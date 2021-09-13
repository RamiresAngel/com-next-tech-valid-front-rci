import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPrestacionesComponent } from './list-prestaciones/list-prestaciones.component';
import { ListPrestacionesRciComponent } from './list-prestaciones-rci/list-prestaciones-rci.component';
import { FormularioPrestacionesComponent } from './formulario-prestaciones/formulario-prestaciones.component';
import { FormularioPrestacionesRciComponent } from './formulario-prestaciones-rci/formulario-prestaciones-rci.component';
import { PrestacionesRoutingModule } from './prestaciones.routing.module';
import { MainPrestacionesComponent } from './main-prestaciones/main-prestaciones.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  imports: [
    CommonModule,
    PrestacionesRoutingModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    ListPrestacionesComponent,
    FormularioPrestacionesComponent
  ],
  declarations: [
    ListPrestacionesRciComponent,
    FormularioPrestacionesRciComponent,
    MainPrestacionesComponent,
    ListPrestacionesComponent,
    FormularioPrestacionesComponent
  ]
})
export class PrestacionesModule { }
