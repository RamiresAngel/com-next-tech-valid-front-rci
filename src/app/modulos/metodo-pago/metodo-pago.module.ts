import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMetodoPagoComponent } from './list-metodo-pago/list-metodo-pago.component';
import { FormularioMetodoPagoComponent } from './formulario-metodo-pago/formulario-metodo-pago.component';
import { FormularioMetodoPagoMxComponent } from './formulario-metodo-pago-mx/formulario-metodo-pago-mx.component';
import { ListMetodoPagoMxComponent } from './list-metodo-pago-mx/list-metodo-pago-mx.component';
import { MainMetodoPagoComponent } from './main-metodo-pago/main-metodo-pago.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    ListMetodoPagoComponent,
    FormularioMetodoPagoComponent,
    FormularioMetodoPagoMxComponent,
    ListMetodoPagoMxComponent,
    MainMetodoPagoComponent,
  ],
  exports: [
    FormularioMetodoPagoMxComponent,
    ListMetodoPagoMxComponent,
  ]
})
export class MetodoPagoModule { }
