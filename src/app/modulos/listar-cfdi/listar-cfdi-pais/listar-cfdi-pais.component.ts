import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltrosCfdiComponent } from '../filtros-cfdi/filtros-cfdi.component';
import { ListarCfdiMxComponent } from '../listar-cfdi-mx/listar-cfdi-mx.component';
import { FiltroCFDI } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-listar-cfdi-pais',
  templateUrl: './listar-cfdi-pais.component.html',
  styleUrls: ['./listar-cfdi-pais.component.css']
})
export class ListarCfdiPaisComponent implements OnInit {
  @ViewChild('tablaDocumentos') tablaDocumentos: ListarCfdiMxComponent;
  public pais = 'mx';
  public filtroConsulta = new FiltroCFDI();
  public es_carga_simple = false;
  constructor(
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    const usuario = this._storageService.getDatosIniciales().usuario;
    if (usuario) {
      console.log(this.pais);

      this.pais = usuario.pais;
    } else {
      this.pais = 'MX';
    }
    this.es_carga_simple = this._storageService.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor === 'carga_doc_no_erp';
  }

  actualizarTabla(filtro: any) {
    this.tablaDocumentos.actualizarTabla(filtro);
  }

}
