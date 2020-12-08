import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoFormaPagoRoutingModule } from './catalogo-forma-pago-routing.module';
import { ListCatalogoFormaPagoComponent } from './list-catalogo-forma-pago/list-catalogo-forma-pago.component';
import { MainCatalogoFormaPagoComponent } from './main-catalogo-forma-pago/main-catalogo-forma-pago.component';
import { FormCatalogoFormaPagoComponent } from './form-catalogo-forma-pago/form-catalogo-forma-pago.component';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CatalogoFormaPagoRoutingModule,

    Select2Module,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [ListCatalogoFormaPagoComponent, MainCatalogoFormaPagoComponent, FormCatalogoFormaPagoComponent]
})
export class CatalogoFormaPagoModule { }
