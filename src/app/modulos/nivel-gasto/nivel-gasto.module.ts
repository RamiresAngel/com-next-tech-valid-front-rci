import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNivelGastoComponent } from './main-nivel-gasto/main-nivel-gasto.component';
import { ListNivelGastoPaisComponent } from './list-nivel-gasto-pais/list-nivel-gasto-pais.component';
import { ListNivelGastoMxComponent } from './list-nivel-gasto-pais/list-nivel-gasto-mx/list-nivel-gasto-mx.component';
import { ListNivelGastoCrComponent } from './list-nivel-gasto-pais/list-nivel-gasto-cr/list-nivel-gasto-cr.component';
import { RouterModule } from '@angular/router';
import { FormularioNivelGastoComponent } from './formulario-nivel-gasto/formulario-nivel-gasto.component';
import { FormularioNivelGastoMxComponent } from './formulario-nivel-gasto/formulario-nivel-gasto-mx/formulario-nivel-gasto-mx.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Select2Module,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [MainNivelGastoComponent, ListNivelGastoPaisComponent, ListNivelGastoMxComponent, ListNivelGastoCrComponent, FormularioNivelGastoComponent, FormularioNivelGastoMxComponent]
})
export class NivelGastoModule { }
