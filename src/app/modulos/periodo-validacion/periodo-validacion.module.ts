import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPeriodoValidacionComponent } from './main-periodo-validacion/main-periodo-validacion.component';
import { FormularioPeriodoValidacionPaisComponent } from './formulario-periodo-validacion-pais/formulario-periodo-validacion-pais.component';
import { FormularioPeriodoValidacionMxComponent } from './formulario-periodo-validacion-mx/formulario-periodo-validacion-mx.component';
import { FormularioPeriodoValidacionCrComponent } from './formulario-periodo-validacion-cr/formulario-periodo-validacion-cr.component';
import { PeriodoValidacionService } from './periodo-validacion.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { MyDatePickerModule } from 'mydatepicker';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule
    , HttpClientModule
    , FormsModule
    , ReactiveFormsModule
    , BrowserModule
    , RouterModule
    , CompartidosModule
    , Select2Module
    , DirectivasModule
    , MyDatePickerModule
    , ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    MainPeriodoValidacionComponent
    , FormularioPeriodoValidacionPaisComponent
    , FormularioPeriodoValidacionMxComponent
    , FormularioPeriodoValidacionCrComponent
  ]
  , providers: [
    PeriodoValidacionService
    // , HttpClient2
  ],
  exports: [
    MainPeriodoValidacionComponent
  ],
})
export class PeriodoValidacionModule { }
