import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaMasivaRoutingModule } from './carga-masiva-routing.module';
import { ListCargaMasivaComponent } from './list-carga-masiva/list-carga-masiva.component';
import { FormularioCargaMasivaComponent } from './formulario-carga-masiva/formulario-carga-masiva.component';
import { MainCargaMasivaComponent } from './main-carga-masiva/main-carga-masiva.component';
import { FiltroCargaMasivaComponent } from './filtro-carga-masiva/filtro-carga-masiva.component';
import { Select2Module } from 'ng2-select2';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { DetalleLoteComponent } from './detalle-lote/detalle-lote.component';

@NgModule({
  imports: [
    CommonModule,
    Select2Module,
    SharedModuleModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    DataTablesModule,
    FormsModule,
    CargaMasivaRoutingModule
  ],
  declarations: [ListCargaMasivaComponent, FormularioCargaMasivaComponent, MainCargaMasivaComponent, FiltroCargaMasivaComponent, DetalleLoteComponent]
})
export class CargaMasivaModule { }
