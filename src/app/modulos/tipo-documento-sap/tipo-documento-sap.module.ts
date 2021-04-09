import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTipoDocumentoSapComponent } from './main-tipo-documento-sap/main-tipo-documento-sap.component';
import { FormularioTipoDocumentoSapComponent } from './formulario-tipo-documento-sap/formulario-tipo-documento-sap.component';
import { ListTipoDocumentoSapComponent } from './list-tipo-documento-sap/list-tipo-documento-sap.component';
import { ListTipoDocumentoMxComponent } from './list-tipo-documento-sap/list-tipo-documento-mx/list-tipo-documento-mx.component';
import { FormularioTipoDocumentoSapMxComponent } from './formulario-tipo-documento-sap/formulario-tipo-documento-sap-mx/formulario-tipo-documento-sap-mx.component';
import { RouterModule } from '@angular/router';
import { TipoDocumentoSapService } from './tipo-documento-sap.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { Select2Module } from 'ng2-select2';

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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    DirectivasModule,
    Select2Module,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [
    TipoDocumentoSapService
  ],
  declarations: [
    MainTipoDocumentoSapComponent,
    FormularioTipoDocumentoSapComponent,
    ListTipoDocumentoSapComponent,
    ListTipoDocumentoMxComponent,
    FormularioTipoDocumentoSapMxComponent
  ],
  exports: [
    DirectivasModule
  ]
})
export class TipoDocumentoSapModule { }
