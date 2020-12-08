import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-formulario-proveedores-pais',
  templateUrl: './formulario-proveedores-pais.component.html',
  styleUrls: ['./formulario-proveedores-pais.component.css']
})
export class FormularioProveedoresPaisComponent implements OnInit {

  public pais: string;
  public vista_carga: any;
  usuario: string;
  constructor(
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {
    const axu_usuario = this._storageService.getDatosIniciales().usuario.pais;
    console.log(axu_usuario);
    const axu_vista = this._storageService.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    console.log(axu_vista);
    if (axu_vista === 'mod_rci') {
      this.vista_carga = axu_vista;
      this.pais = '';
    } else {
      if (axu_usuario === 'MX') {
        this.pais = axu_usuario;
        this.vista_carga = '';
      } else {
        this.pais = 'CR';
        this.vista_carga = '';
      }
    }
  }

  ngOnInit() {
  }

}
