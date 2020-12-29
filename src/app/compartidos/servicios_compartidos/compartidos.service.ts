import { AprobacionRequest } from './../../entidades/solicitud-anticipo-gastos-viaje';
import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DetailsDocumentoGastosRD, HeaderGastosRD, ItemCodigoRecepcion, ItemDocumentoRD, CuentaProrrateo } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})

export class CompartidosService {
  endpoint: string;
  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {

  }

  public obtenerTipoDocumento(identificador_corporativo) {
    return this._http.get(`${this.globals.host_administracion}/cat_tipo_documento/${identificador_corporativo}/identificador_corporativo`);
  }

  public obtenerTipoGasto(identificador_corporativo) {
    // this.globals.host
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/${identificador_corporativo}/identificador_corporativo`);
  }

  public obtenerContribuyentesXCorporativo(identificador_corporativo, id_user: string, id_rol: number) {
    return this._http.get(`${this.globals.host_corporativo}/contribuyente/mx/${identificador_corporativo}/corporativo/min/${id_user}/usuario/${id_rol}/rol`);
  }

  public obtenerSucursalesXCorporativo(identificador_corporativo, id_user: string, id_rol: number) {
    return this._http.get(`${this.globals.host_corporativo}/sucursal/mx/${identificador_corporativo}/corporativo/min/${id_user}/usuario/${id_rol}/rol`);
  }
  public obtenerSucursalesXCorporativoXContribuyente(identificador_corporativo: string, identificador_contribuyente: string) {
    return this._http.get(`${this.globals.host_corporativo}/sucursal/mx/${identificador_corporativo}/corporativo/${identificador_contribuyente}/contribuyente/min`);
  }

  public obtenerCCXContribuyenteXSucursal(identificador_contribuyente, identificador_sucursal) {
    return this._http.get(this.globals.host_administracion + '/centro_consumo_costo/' + identificador_contribuyente + '/emisor/' + identificador_sucursal + '/sucursal/min');
  }

  public obtenerDepartamentosXCorporativo(identificador_corporativo, id_user: string, id_rol: number) {
    return this._http.get(`${this.globals.host_corporativo}/departamento/${identificador_corporativo}/corporativo/min/${id_user}/usuario/${id_rol}/rol`);
    // return this._http.get(this.globals.host + '/api/v1/validm/corporativo/departamento/' + identificador_corporativo + '/corporativo/min/');
  }
  public obtenerDepartamentosXSucursal(identificador_sucural: string) {
    return this._http.get(`${this.globals.host_corporativo}/departamento/${identificador_sucural}/sucursal`);

    // return this._http.get(this.globals.host + '/api/v1/validm/corporativo/departamento/' + identificador_corporativo + '/corporativo/min/');
  }

  public obtenerMonedas() {
    return this._http.get(this.globals.host_administracion + '/cat_moneda/');
  }
  public obtenerMonedasCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globals.host_administracion + `/cat_moneda/${identificador_corporativo}/identificador_corporativo`);
  }
  public crearRelacionCorporativoMoneda(lista_relaciones: any[]) {
    return this._http.post(this.globals.host_administracion + `/cat_moneda`, lista_relaciones);
  }

  public obtenerEstatusProveedor() {
    return this._http.get(this.globals.host_corporativo + '/estatus/proveedor');
  }
  public obtenerEstatusSAP() {
    return this._http.get(this.globals.host_corporativo + '/estatus/sap');
  }
  public obtenerEstatus() {
    return this._http.get(this.globals.host_corporativo + '/estatus');
  }

  public obtenerEmpresasIdCorporativoIdUsuario(identificador_corporativo, identificador_usuario) {
    return this._http.get(this.globals.host_corporativo + `/usuario/contribuyentes_by/${identificador_corporativo}/corporativo/${identificador_usuario}/usuario`);
  }

  public obtenerHotelIdContribuyenteIdUsuario(identificador_contribuyente, identificador_usuario) {
    return this._http.get(this.globals.host_corporativo + `/usuario/sucursales_by/${identificador_contribuyente}/contribuyente/${identificador_usuario}/usuario`);
  }

  public obtenerAcreedoresTipoGastoIdContribuyente(id_tipo_gasto, identificador_contribuyente) {
    return this._http.get(this.globals.host_corporativo + `/usuario/acredores_by/${identificador_contribuyente}/contribuyente/${id_tipo_gasto}/tipo_gasto`);
  }
  public obtenerAcreedoresContribuyente(identificador_contribuyente) {
    return this._http.get(this.globals.host_corporativo + `/acreedor/proveedorby/${identificador_contribuyente}/contribuyente`);
  }
  public obtenerproveedorInformalontribuyente(identificador_contribuyente) {
    return this._http.get(this.globals.host_corporativo + `/acreedor/proveedor_informalby/${identificador_contribuyente}/contribuyente`);
  }
  public obtenerContribuyentesProveedorId(identificador_proveedor) {
    return this._http.get(`${this.globals.host_corporativo}/acreedor/acreedor_empresa/${identificador_proveedor}/proveedor`);
  }

  obtenerTiposMovimiento(identificador_corporativo) {
    return this._http.get(`${this.globals.host_administracion}/catalogo/tipo_movimiento/${identificador_corporativo}/identificador_corporativo`);
  }
  obtenerDetalleCR(id_codigo_recepcion: number) {
    return this._http.get(`${this.globals.host_documentos}/codigo_recepcion/${id_codigo_recepcion}/id`);
  }
  obtenerFormaPago(identificador_corporativo: string) {
    return this._http.get(`${this.globals.host_gastos_viaje}/forma_pago/${identificador_corporativo}/corporativo`);
  }

  public guardarDetalleDocumentoRD(detalle: ItemDocumentoRD) {
    return this._http.post(`${this.globals.host_republica_dominicana}/bufer_facturas_detail/`, detalle);
  }

  public eliminarDetalleDocumentoRD(id_detalle: number) {
    return this._http.delete(`${this.globals.host_republica_dominicana}/bufer_facturas_detail/${id_detalle}`);
  }

  public guardarAcreedorDiveroRD(identificador_header: string) {
    return this._http.post(`${this.globals.host_republica_dominicana}/factura_acreedor/`, { identificador: identificador_header });
  }
  public guardarAmortizacionRD(identificador_header: string) {
    // return this._http.post(`http://192.168.20.5/api/v1/validm/republica_dominicana/factura_amortizacion/`, { identificador: identificador_header });
    return this._http.post(`${this.globals.host_republica_dominicana}/factura_amortizacion/`, { identificador: identificador_header });
  }

  public guardarHeaderGastoRD(header_gasto: HeaderGastosRD) {
    // return this._http.post(`http://192.168.20.5/api/v1/validm/republica_dominicana/bufer_facturas_header/`, header_gasto);
    return this._http.post(`${this.globals.host_republica_dominicana}/bufer_facturas_header/`, header_gasto);
  }
  public guardarCuentasProrrateoAcreedoresRD(identificador_header: string, lista_cuentas_prorrateo: CuentaProrrateo[]) {
    return this._http.post(`${this.globals.host_republica_dominicana}/bufer_facturas_header/prorrateo/${identificador_header}`, lista_cuentas_prorrateo);
  }
  public guardarProveedorInformalRD(identificador_header: string) {
    return this._http.post(`${this.globals.host_republica_dominicana}/factura_proveedor_informal/`, { identificador: identificador_header });
  }
  public obtenerLocalidades() {
    return this._http.get(`${this.globals.host_republica_dominicana}/localidad/`);
  }
  public obtenerPeriodosAmortizacion(identificador_amortizacion_header: string) {
    return this._http.get(`${this.globals.host_republica_dominicana}/factura_amortizacion/periodos/${identificador_amortizacion_header}`);
  }
  public obtenerCatalogoPaises() {
    return this._http.get(`${this.globals.host_administracion}/catalogo/pais`);
  }
  public obtenerCondicionPago() {
    return this._http.get(`${this.globals.host_administracion}/catalogo/condicion_pago`);
  }


  public getAllContribuyentesCorporativo(identificador_corporativo) {
    return this._http.get(`${this.globals.host_corporativo}/contribuyente/mx/${identificador_corporativo}/corporativo/min`);
  }

  public getAllSucursalesCorporativo(identificador_corporativo) {
    return this._http.get(`${this.globals.host_corporativo}/sucursal/mx/${identificador_corporativo}/corporativo/min`);
  }
  public getAllDepartamentosCorporativo(identificador_corporativo) {
    return this._http.get(`${this.globals.host_corporativo}/departamento/${identificador_corporativo}/corporativo/min`);
  }

  public facturaProveedorAprobar(request_aprobacion: AprobacionRequest) {
    return this._http.post(`${this.globals.host_documentos}/factura_proveedor/aprobar`, request_aprobacion);
  }
  public facturaProveedorRechazar(request_aprobacion: AprobacionRequest) {
    return this._http.post(`${this.globals.host_documentos}/factura_proveedor/rechazar`, request_aprobacion);
  }

  public agregarAnexos(data: { id_documento: string, base_64: string, nombre_archivo: string, extension: string, identificador_corporativo: string }) {
    return this._http.post(`${this.globals.host_documentos}/carga_anexos`, data);
  }

  public descargarAnexo(data: { extension: string, identificador: string }) {
    return this._http.post(`${this.globals.host_documentos}/consulta_anexo`, data);
  }

  public actualizarPdf(data: { id_documento: string, uuid: string, identificador_corporativo: string, base_64: string }) {
    return this._http.put(`${this.globals.host_documentos}/update_pdf`, data);
  }

  public listarAnexos(id_documento) {
    return this._http.get(`${this.globals.host_documentos}/anexos_cfdi/${id_documento}/id_documento`);
  }

  public eliminarAnexos(id_anexo) {
    return this._http.delete(`${this.globals.host_documentos}/anexos_cfdi/${id_anexo}/id_anexo`);
  }


  consultarComprobantes(body: { identificador: string, extension: string }) {
    return this._http.post(`${this.globals.host_documentos}/consulta_comprobante`, body);
  }
  obtenerComprobantes(id_documento) {
    return this._http.get(`${this.globals.host_documentos}/comprobantes_cfdi/${id_documento}/id_documento`);
  }
}
