import { FacturaExtranjeraRCI } from './../../entidades/FacturaExtranjeraRCI';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SucursalMx } from '../../entidades/sucursal-mx';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { CargaDocumentoOC, FacturaProveedorRD } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Injectable({
  providedIn: 'root'
})

export class CargaDocumentosService {
  header: HttpHeaders;
  host_temp: string;

  constructor(
    private globalsComponent: GlobalsComponent
    , private _http: HttpClient2,
    private _storageService: StorageService
  ) {
    this.host_temp = this.globalsComponent.host;
  }

  public ObtenerDocumentosMX() {
    return this._http.get(this.globalsComponent.host);
  }

  public ObtenerListaDocumentosMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host);
  }

  public ObtenerDocumentoMXByid(identificador_sucursal: string) {
    return this._http.get(this.globalsComponent.host);
  }

  public GuardarDocumentoMX(sucursal: SucursalMx) {
    return this._http.post(this.globalsComponent.host, sucursal);
  }

  public ActualizarDocumentoMX(sucursal: SucursalMx) {
    return this._http.put(this.globalsComponent.host, sucursal);
  }

  public validarOrdenCompraMX(numero_orden: string, identificador_corporativo: string) {
    const obj = {
      numero_orden: numero_orden,
      identificador_corporativo: identificador_corporativo
    };
    return this._http.post(`${this.globalsComponent.host_documentos}/orden_compra`, obj);
    // return this._http.post(`${this.globalsComponent.host}/api/v1/validm/documento/orden_compra`, obj);
  }
  public obtenerOrdenCompraMultipleMX(orden_compra: any) {
    return this._http.post(`${this.globalsComponent.host_documentos}/orden_compra/multiple`, { ordenes_compra: orden_compra });
  }
  public validarDocumentoCFDI(id_documento: string) {
    return this._http.get(`${this.globalsComponent.host_documentos}/get_validaciones/${id_documento}`);
  }
  public cargarDocumento(documento: CargaDocumentoOC) {
    const datos_inciales = this._storageService.getDatosIniciales();
    const url = datos_inciales.funcionalidades.find(o => o.clave === 'MOD_CARGADOC').valor;
    return this._http.post(`${this.globalsComponent.host_documentos}/${url}`, documento);
  }
  public cargarDocumentoMultiple(documento: CargaDocumentoOC) {
    return this._http.post(`${this.globalsComponent.host_documentos}/carga/multiple`, documento);
  }
  public reprocesar(identificador: any) {
    return this._http.post(`${this.globalsComponent.host_documentos}/reproceso`, identificador);
  }

  public obtenerSaldos(id_documento, identificador_corporativo) {
    return this._http.post(`${this.globalsComponent.host_documentos}/consulta_saldos_proveedor`, { orden_compra: id_documento, identificador_corporativo });
  }

  public agregarDocumento(documento: any) {
    const datos_inciales = this._storageService.getDatosIniciales();
    const url = datos_inciales.funcionalidades.find(o => o.clave === 'MOD_CARGADOC').valor;
    return this._http.post(`${this.globalsComponent.host_documentos}/${url}`, documento);
  }

  public obtenerCodigoRecepcionItem(codigo_recepcion_id: string) {
    return this._http.get(`${this.globalsComponent.host_republica_dominicana}/factura_proveedor/codigo_recepcion_item/${codigo_recepcion_id}`);
  }
  public obtenerOrdenCompraRD(numero_oc: string) {
    return this._http.get(`${this.globalsComponent.host_republica_dominicana}/factura_proveedor/orden_compra/${numero_oc}`);
  }
  public obtenerSaldosRD(ordenes_compra_id: string) {
    return this._http.get(`${this.globalsComponent.host_republica_dominicana}/factura_proveedor/saldos/${ordenes_compra_id}`);
  }
  public cargaFacturaProveedor(factura_proveedor: FacturaProveedorRD) {
    return this._http.post(`${this.globalsComponent.host_republica_dominicana}/factura_proveedor/`, factura_proveedor);
  }
  public cargaFacturaProveedorExtRCI(factura_proveedor: FacturaExtranjeraRCI) {
    return this._http.post(`${this.globalsComponent.host_documentos}/factura_extranjera/add`, factura_proveedor);
  }

}
