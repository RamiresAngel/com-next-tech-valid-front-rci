import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-carga-documentos-pais',
  templateUrl: './carga-documentos-pais.component.html',
  styleUrls: ['./carga-documentos-pais.component.css']
})
export class CargaDocumentosPaisComponent implements OnInit {

  public pais = 'MX';
  public oc: string;
  public uuid: string;
  public vista_carga: any;
  constructor(
    private activateRoute: ActivatedRoute,
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {
    this.activateRoute.params.subscribe(id => {
      this.oc = id['numero_orden'];
      this.uuid = id['uuid'];
    });
    this.vista_carga = this._storageService.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
  }

  ngOnInit() {
    const usuario = this._storageService.getDatosIniciales().usuario;
    if (usuario) {
      this.pais = usuario.pais;
    } else {
      this.pais = 'MX';
    }
  }

}

