import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCuentaMainComponent } from './tipo-cuenta-main/tipo-cuenta-main.component';
import { TipoCuentaListComponent } from './tipo-cuenta-list/tipo-cuenta-list.component';
import { TipoCuentaListMxComponent } from './tipo-cuenta-list-mx/tipo-cuenta-list-mx.component';
import { TipoCuentaFormularioMxComponent } from './tipo-cuenta-formulario-mx/tipo-cuenta-formulario-mx.component';
import { TipoCuentaFormularioComponent } from './tipo-cuenta-formulario/tipo-cuenta-formulario.component';
import { RouterModule } from '@angular/router';
import { TipoCuentaService } from './tipo-cuenta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

@NgModule({
  imports: [
    CommonModule,
    Select2Module,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    TipoCuentaMainComponent,
    TipoCuentaListComponent,
    TipoCuentaListMxComponent,
    TipoCuentaFormularioMxComponent,
    TipoCuentaFormularioComponent],
  providers: [
    TipoCuentaService
  ]
})
export class TipoCuentaModule { }
