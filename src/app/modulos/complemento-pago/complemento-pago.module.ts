import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComplementoPagoComponent } from './main-complemento-pago/main-complemento-pago.component';
import { ComplementoPaisComponent } from './complemento-pais/complemento-pais.component';
import { ComplementoCrComponent } from './complemento-cr/complemento-cr.component';
import { ComplementoMxComponent } from './complemento-mx/complemento-mx.component';
import { ComplementoPagoService } from './complemento-pago.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , ReactiveFormsModule
    , Select2Module
  ],
  providers: [
    ComplementoPagoService
  ],
  declarations: [MainComplementoPagoComponent
    , ComplementoPaisComponent
    , ComplementoCrComponent
    , ComplementoMxComponent]
})
export class ComplementoPagoModule { }
