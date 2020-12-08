import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html'
})
export class FormularioUsuarioComponent {
  public pais: string;
  public vista_carga: any;
  usuario: string;
  public datos_inciales: DatosIniciales;

  constructor(
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    const axu_vista = this.datos_inciales.funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    if (this.datos_inciales.usuario.pais === 'MX') {
      if (axu_vista === 'mod_rci') {
        this.vista_carga = axu_vista;
        this.pais = '';
      } else {
        this.pais = this.datos_inciales.usuario.pais;
        this.vista_carga = '';
      }
    } else {
      this.pais = this.datos_inciales.usuario.pais;
      this.vista_carga = '';
    }
  }

}
