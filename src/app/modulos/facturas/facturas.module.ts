import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura/factura.component';
import { FacturasService } from './facturas.service';

@NgModule({
  imports: [
    CommonModule
  ]
  /*declarations: [
    FacturaComponent
  ]*/,
  providers: [
    FacturasService
  ]
})
export class FacturasModule { }
