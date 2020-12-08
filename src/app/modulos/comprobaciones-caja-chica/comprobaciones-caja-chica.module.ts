import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComprobacionesCajaChicaComponent } from './main-comprobaciones-caja-chica/main-comprobaciones-caja-chica.component';
import { FormComprobacionesCajaChicaComponent } from './form-comprobaciones-caja-chica/form-comprobaciones-caja-chica.component';
import { FormComprobacionesCajaChicaMxComponent } from './form-comprobaciones-caja-chica-mx/form-comprobaciones-caja-chica-mx.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Select2Module,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    MainComprobacionesCajaChicaComponent,
     FormComprobacionesCajaChicaComponent,
      FormComprobacionesCajaChicaMxComponent
    ]
})
export class ComprobacionesCajaChicaModule { }
