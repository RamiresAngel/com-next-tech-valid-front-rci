import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSustitucionCfdiComponent } from './main-sustitucion-cfdi/main-sustitucion-cfdi.component';
import { ListSustitucionCfdiComponent } from './list-sustitucion-cfdi/list-sustitucion-cfdi.component';
import { FormSustitucionCfdiComponent } from './form-sustitucion-cfdi/form-sustitucion-cfdi.component';
import { FormSustitucionCfdiMxComponent } from './form-sustitucion-cfdi-mx/form-sustitucion-cfdi-mx.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [MainSustitucionCfdiComponent,
    ListSustitucionCfdiComponent,
    FormSustitucionCfdiComponent,
    FormSustitucionCfdiMxComponent,
  ]
})
export class SustitucionCfdiModule { }
