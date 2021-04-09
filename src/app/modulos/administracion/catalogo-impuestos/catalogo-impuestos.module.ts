import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoImpuestosRoutingModule } from './catalogo-impuestos-routing.module';
import { MainCatalogoImpuestosComponent } from './main-catalogo-impuestos/main-catalogo-impuestos.component';
import { ListCatalogoImpuestosComponent } from './list-catalogo-impuestos/list-catalogo-impuestos.component';
import { FormCatalogoImpuestosComponent } from './form-catalogo-impuestos/form-catalogo-impuestos.component';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CatalogoImpuestosRoutingModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [MainCatalogoImpuestosComponent, ListCatalogoImpuestosComponent, FormCatalogoImpuestosComponent]
})
export class CatalogoImpuestosModule { }
