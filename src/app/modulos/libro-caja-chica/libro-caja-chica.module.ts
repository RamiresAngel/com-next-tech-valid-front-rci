import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLibroCajaChicaComponent } from './main-libro-caja-chica/main-libro-caja-chica.component';
import { FormularioLibroCajaChicaComponent } from './formulario-libro-caja-chica/formulario-libro-caja-chica.component';
import { ListLibroCajaChicaComponent } from './list-libro-caja-chica/list-libro-caja-chica.component';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

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
    DirectivasModule,
    HttpClientModule,
    BrowserModule,
    Select2Module,
    FormsModule,
    RouterModule,
    CompartidosModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),

  ],
  declarations: [MainLibroCajaChicaComponent, FormularioLibroCajaChicaComponent, ListLibroCajaChicaComponent],
  providers: [
    LibroCajaChicaModule,
    HttpClient2
  ]
})

export class LibroCajaChicaModule { }
