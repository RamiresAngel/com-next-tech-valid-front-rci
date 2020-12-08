import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSolicitudGeneralComponent } from './main-solicitud-general/main-solicitud-general.component';
import { ListAnticiposGeneralPaisComponent } from './list-anticipos-general-pais/list-anticipos-general-pais.component';
import { ListAnticiposGeneralMxComponent } from './list-anticipos-general-mx/list-anticipos-general-mx.component';
import { ListAnticiposGeneralCrComponent } from './list-anticipos-general-cr/list-anticipos-general-cr.component';
import { FormularioAnticiposGeneralPaisComponent } from './formulario-anticipos-general-pais/formulario-anticipos-general-pais.component';
import { FormularioAnticiposGeneralMxComponent } from './formulario-anticipos-general-mx/formulario-anticipos-general-mx.component';
import { FormularioAnticiposGeneralCrComponent } from './formulario-anticipos-general-cr/formulario-anticipos-general-cr.component';
import { RouterModule } from '@angular/router';
import { SolicitudGeneralService } from './solicitud-general.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { BandejaAprobacionService } from '../bandeja-aprobacion/bandeja-aprobacion.service';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    SharedModuleModule,
    Select2Module,
    DirectivasModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MyDatePickerModule,
    DataTablesModule,
    FormsModule
  ],
  exports: [
    ListAnticiposGeneralMxComponent,
    ListAnticiposGeneralPaisComponent
  ],
  providers: [
    SolicitudGeneralService,
    BandejaAprobacionService
  ]
  , declarations: [
    MainSolicitudGeneralComponent,
    ListAnticiposGeneralPaisComponent,
    ListAnticiposGeneralMxComponent,
    ListAnticiposGeneralCrComponent,
    FormularioAnticiposGeneralPaisComponent,
    FormularioAnticiposGeneralMxComponent,
    FormularioAnticiposGeneralCrComponent
  ]
})
export class SolicitudGeneralModule { }
