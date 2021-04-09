import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';

@Component({
  selector: 'app-list-tipo-gasto-pais',
  templateUrl: './list-tipo-gasto-pais.component.html',
  styleUrls: ['./list-tipo-gasto-pais.component.css']
})
export class ListTipoGastoPaisComponent implements OnInit {

  public pais: string;
  public vista_carga: any;
  constructor(
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {
    const axu_usuario = this._storageService.getDatosIniciales().usuario.pais;
    const axu_vista = this._storageService.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    if (axu_vista === 'mod_rci') {
      this.vista_carga = axu_vista;
      this.pais = '';
    } else {
      this.pais = axu_usuario;
      this.vista_carga = '';
    }
  }

  ngOnInit() {
  }

}
