import { MyDatePickerModule } from 'mydatepicker';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ReporteGastosRoutingModule } from './reporte-gastos-routing.module';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

import { ReporteListComponent } from './reporte-list/reporte-list.component';
import { ReporteMainComponent } from './reporte-main/reporte-main.component';
import { ReporteFiltroComponent } from './reporte-filtro/reporte-filtro.component';

@NgModule({
  imports: [
    CommonModule,
    ReporteGastosRoutingModule,
    DataTablesModule,
    FormsModule,
    RouterModule,
    CompartidosModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  declarations: [ReporteListComponent, ReporteMainComponent, ReporteFiltroComponent]
})
export class ReporteGastosModule { }
