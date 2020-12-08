import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoTipoRetencionRoutingModule } from './catalogo-tipo-retencion-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainTipoRetencionComponent } from './main-tipo-retencion/main-tipo-retencion.component';
import { ListTipoRetencionComponent } from './list-tipo-retencion/list-tipo-retencion.component';
import { FormTipoRetencionComponent } from './form-tipo-retencion/form-tipo-retencion.component';
import { Select2Module } from 'ng2-select2';

@NgModule({
  declarations: [
    MainTipoRetencionComponent,
    ListTipoRetencionComponent,
    FormTipoRetencionComponent
  ],
  imports: [
    CommonModule,
    CatalogoTipoRetencionRoutingModule,

    Select2Module,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ]
})
export class CatalogoTipoRetencionModule { }
