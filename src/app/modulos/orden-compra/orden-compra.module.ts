import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainOrdenCompraComponent } from './main-orden-compra/main-orden-compra.component';
import { ListOrdenCompraComponent } from './list-orden-compra/list-orden-compra.component';
import { ListOrdenCompraMxComponent } from './list-orden-compra-mx/list-orden-compra-mx.component';
import { RouterModule } from '@angular/router';
import { FiltroOrdenCompraComponent } from './filtro-orden-compra/filtro-orden-compra.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalDetalleOcMxComponent } from '../carga-documentos/modal-detalle-oc-mx/modal-detalle-oc-mx.component';
import { CargaDocumentosModule } from '../carga-documentos/carga-documentos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    SharedModuleModule,
    DirectivasModule,
    CommonModule,
    RouterModule,
    Select2Module,
    FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaDocumentosModule
  ],
  declarations: [
    MainOrdenCompraComponent,
    ListOrdenCompraComponent,
    ListOrdenCompraMxComponent,
    FiltroOrdenCompraComponent,
  ]
})
export class OrdenCompraModule { }
