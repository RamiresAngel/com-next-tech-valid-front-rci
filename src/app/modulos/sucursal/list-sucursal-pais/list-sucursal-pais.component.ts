import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-list-sucursal-pais',
  templateUrl: './list-sucursal-pais.component.html',
  styleUrls: ['./list-sucursal-pais.component.css']
})
export class ListSucursalPaisComponent implements OnInit {

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
        this.pais === 'CR';
        this.vista_carga = '';
      }
    }
  }

  ngOnInit() {
  }

}
