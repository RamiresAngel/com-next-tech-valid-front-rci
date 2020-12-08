import { SharedModuleModule } from './../../compartidos/shared-module/shared-module.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng2-select2';
import { BolsaFlexibleRoutingModule } from './bolsa-flexible-routing.module';
import { BolsaFlexibleMainComponent } from './bolsa-flexible-main/bolsa-flexible-main.component';
import { BolsaFlexibleListRciComponent } from './bolsa-flexible-list-rci/bolsa-flexible-list-rci.component';
import { ModalCargaMasivaBfComponent } from './modal-carga-masiva-bf/modal-carga-masiva-bf.component';

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
    SharedModuleModule,

    BolsaFlexibleRoutingModule
  ],
})
export class BolsaFlexibleModule { }
