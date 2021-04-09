import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAmortizacionComponent } from './main-amortizacion/main-amortizacion.component';
import { ListAmortizacionPaisComponent } from './list-amortizacion-pais/list-amortizacion-pais.component';
import { ListAmortizacionMxComponent } from './list-amortizacion-mx/list-amortizacion-mx.component';
import { FormularioAmortizacionMxComponent } from './formulario-amortizacion-mx/formulario-amortizacion-mx.component';
import { FormularioAmortizacionPaisComponent } from './formulario-amortizacion-pais/formulario-amortizacion-pais.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltroAmortizacionComponent } from './filtro-amortizacion/filtro-amortizacion.component';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { ModalDetallesAmortizacionComponent } from './modal-detalles-amortizacion/modal-detalles-amortizacion.component';
import { ModalDetallePeriodosComponent } from './modal-detalle-periodos/modal-detalle-periodos.component';
import { ListaAmortizacionRdComponent } from './lista-amortizacion-rd/lista-amortizacion-rd.component';
import { FormularioAmortizacionRdComponent } from './formulario-amortizacion-rd/formulario-amortizacion-rd.component';
import { ModalDetalleAmortizacionRdComponent } from './modal-detalle-amortizacion-rd/modal-detalle-amortizacion-rd.component';
import { ModalDetallePeriodosRdComponent } from './modal-detalle-periodos-rd/modal-detalle-periodos-rd.component';
import { CompartidosModule } from './../../compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MyDatePickerModule,
    Select2Module,
    DataTablesModule,
    CompartidosModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
  , exports: [
    ListAmortizacionMxComponent,
    ListAmortizacionPaisComponent,
    ModalDetalleAmortizacionRdComponent
  ],
  declarations: [
    MainAmortizacionComponent,
    ListAmortizacionPaisComponent,
    ListAmortizacionMxComponent,
    FormularioAmortizacionMxComponent,
    FormularioAmortizacionPaisComponent,
    FiltroAmortizacionComponent,
    ModalDetallesAmortizacionComponent,
    ModalDetallePeriodosComponent,
    ListaAmortizacionRdComponent,
    FormularioAmortizacionRdComponent,
    ModalDetalleAmortizacionRdComponent,
    ModalDetallePeriodosRdComponent
  ]
})
export class AmortizacionModule { }
