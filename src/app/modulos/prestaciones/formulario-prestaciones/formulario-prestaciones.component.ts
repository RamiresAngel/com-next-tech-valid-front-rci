import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-formulario-prestaciones',
  templateUrl: './formulario-prestaciones.component.html',
  styleUrls: ['./formulario-prestaciones.component.css']
})
export class FormularioPrestacionesComponent implements OnInit {

  public pais: string;
  public vista_carga: any;
  constructor(
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {
    const axu_usuario = this._storageService.getDatosIniciales().usuario.pais;
    const axu_vista = this._storageService.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    if (axu_usuario === 'MX') {
      if (axu_vista === 'mod_rci') {
        this.vista_carga = axu_vista;
        this.pais = '';
      } else {
        this.pais = axu_usuario;
        this.vista_carga = '';
      }
    } else {
      this.pais = axu_usuario;
      this.vista_carga = '';
    }
  }

  ngOnInit() {
  }

}
