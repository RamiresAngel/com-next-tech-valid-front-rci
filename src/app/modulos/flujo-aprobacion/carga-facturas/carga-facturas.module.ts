import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCargaFacturasComponent } from './main-carga-facturas/main-carga-facturas.component';
import { ListCargaFacturasComponent } from './list-carga-facturas/list-carga-facturas.component';
import { ListCargaFacturasCrComponent } from './list-carga-facturas-cr/list-carga-facturas-cr.component';
import { ListCargaFacturasPaisComponent } from './list-carga-facturas-pais/list-carga-facturas-pais.component';
import { ListCargaFacturasMxComponent } from './list-carga-facturas-mx/list-carga-facturas-mx.component';
import { FormularioCargaFacturasMxComponent } from './formulario-carga-facturas-mx/formulario-carga-facturas-mx.component';
import { FormularioCargaFacturasPaisComponent } from './formulario-carga-facturas-pais/formulario-carga-facturas-pais.component';
import { FormularioCargaFacturasCrComponent } from './formulario-carga-facturas-cr/formulario-carga-facturas-cr.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainCargaFacturasComponent, ListCargaFacturasComponent, ListCargaFacturasCrComponent, ListCargaFacturasPaisComponent, ListCargaFacturasMxComponent, FormularioCargaFacturasMxComponent, FormularioCargaFacturasPaisComponent, FormularioCargaFacturasCrComponent]
})
export class CargaFacturasModule { }
