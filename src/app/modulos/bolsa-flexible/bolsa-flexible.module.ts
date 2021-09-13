import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { Select2Module } from 'ng2-select2';

import { BolsaFlexibleRoutingModule } from './bolsa-flexible-routing.module';
import { BolsaFlexibleMainComponent } from './bolsa-flexible-main/bolsa-flexible-main.component';
import { BolsaFlexibleListRciComponent } from './bolsa-flexible-list-rci/bolsa-flexible-list-rci.component';
import { ModalCargaMasivaBfComponent } from './modal-carga-masiva-bf/modal-carga-masiva-bf.component';
import { CompartidosModule } from './../../compartidos/compartidos.module';

@NgModule({
  declarations: [
    BolsaFlexibleMainComponent,
    BolsaFlexibleListRciComponent,
    ModalCargaMasivaBfComponent
  ],
  imports: [
    CommonModule,
    Select2Module,
    DataTablesModule,
    CompartidosModule,
    BolsaFlexibleRoutingModule
  ],
})
export class BolsaFlexibleModule { }
