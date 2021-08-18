import { TipoGastoService } from './../../../tipo-gasto/tipo-gasto.service';
import { GastosViajeService } from './../../../gastos-viaje/gastos-viaje.service';
import { ComprobacionHeader } from './../../../../entidades/ComprobacionExtranjera';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { CentroCostosService } from './../../../centro-costos/centro-costos.service';
import { CompartidosService } from './../../../../compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { ComprobacionGastosHeader } from './../../../../entidades/ComprobacionGastosHeader';
import { Component, ViewChild } from '@angular/core';
import { AprobacionParcial, AprobacionParcialConcepto, ComprobacionGastosDetalle, Usuario } from 'src/app/entidades';
import { DefaultCFDI } from 'src/app/entidades/cfdi';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
import { BandejaAprobacionService } from 'src/app/modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { Subscription } from 'rxjs';
import { TipoGastoComprobacion } from 'src/app/entidades/comprobacion';
import { FormComrpobacionHeaderComponent } from 'src/app/compartidos/comprobacion-components/form-comprobacion-header/form-comprobacion-header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-caja-chica-form',
  templateUrl: './caja-chica-form.component.html',
  styleUrls: ['./caja-chica-form.component.css']
})
export class CajaChicaFormComponent {
  @ViewChild('select_tipo_comprobante') select_tipo_comprobante: any;
  @ViewChild('comprobacionHeader') comprobacionHeader: FormComrpobacionHeaderComponent;

  TIPO_GASTO: 2 = 2;
  TIPO_MOVIMIENTO: 6 = 6;
  URL_DOCUMENTO: String = 'caja_chica';
  consecutivo_comprobante: number;

  numero_comprobacion: number;
  totales = { total_gastado: 0, monto_reembolsable: 0, tipo_cambio: 0 }
  lista_comprobantes = new Array<ComprobacionGastosDetalle>();

  numero_viaje: string;
  numero_viaje_valido: boolean;
  tipo_comprobante: 'nacional' | 'internacional' | '' = '';
  public solicitud: any;
  public id_solicitud: number = 0;
  public total_comprobado: number = 0;
  public lista_cuentas: TipoGastoComprobacion[] = [];
  public lista_comprobaciones = [];
  public lista_contribuyentes = [];
  public lista_centros_costo = [];
  public lista_aprobadores = [];
  public lista_monedas = [];
  array_comprobaciones = new Array<ComprobacionHeader>();
  nueva_comprobacion: ComprobacionHeader;
  fecha_comprobante: string;
  tipo_cambio = 1;
  show_loading = false;
  jefe_inmediato: { identificador_usuario: string, nombre: string };
  comprobacion_header = new ComprobacionGastosHeader();


  aprobacion_data: { nivel_aproacion: number, is_aprobacion: boolean }
  aprobacionDataSubscription: Subscription;
  aprobacion_parcial = new AprobacionParcial();
  public is_reporte = false;
  usuario: Usuario;
  title: string;
  constructor(
    private _gastoViajeService: GastosViajeService,
    private router: Router,
    private _compartidoService: CompartidosService,
    private _tipoGastoService: TipoGastoService,
    private _centroCostosService: CentroCostosService,
    private _comprobacionService: ComprobacionesGastosService,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private globals: GlobalsComponent,
    private _storageService: StorageService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.aprobacion_data = JSON.parse(localStorage.getItem('aprobacion_data'));
    this.title = 'Caja Chica';
    this.obtenerCatalogos();
    this.activatedRoute.params.subscribe(params => {
      this.numero_comprobacion = params['identificador'];
      if (params['reporte'] && params['reporte'] == 'r') {
        this.is_reporte = true;
      }
      if (this.numero_comprobacion) {
        this.numero_comprobacion = parseInt(this._storageService.desencriptar_ids(this.numero_comprobacion));
        this.obtenerComprobacion();
      } else {
        this.iniciarComoprobacion();
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this._bandejaAprobacionService.setAprobacionData({ nivel_aproacion: null, is_aprobacion: null });
  }

  async iniciarComoprobacion() {
    this.comprobacion_header = new ComprobacionGastosHeader();
    this.comprobacion_header.nombre_usuario = this.usuario.nombre;
    this.comprobacion_header.identificador_cc = this.usuario.identificador_centro_costo;
    const nombre = await this.obtenerAprobadores();
    this.comprobacion_header.nombre_usuario_aprobador = nombre;
    this.comprobacionHeader.setComprobacionHeader(this.comprobacion_header);
  }

  async guardarFormHeader(comprobacionHeader) {
    try {
      this.loadingService.showLoading();
      comprobacionHeader.recuperable = comprobacionHeader.recuperable ? 1 : 0;
      if (this.comprobacion_header.id) {
        await this.actualizarHeaderComprobacion(comprobacionHeader);
      } else {
        await this.guardarHeaderComprobacion(comprobacionHeader);
      }
      this.loadingService.hideLoading();
    } catch (error) {
      this.loadingService.hideLoading();
      Swal.fire('¡Error!', error.error.mensaje || 'Error al procesar la solicitud.', 'error');
    }
  }

  actualizarHeaderComprobacion(comprobacionHeader): Promise<void> {
    return new Promise((reject, resolve) => {
      this._comprobacionService.updateHeaderComprobacion(comprobacionHeader).subscribe((data: any) => {
        Swal.fire('', data.mensaje || 'Datos actualizados correctamente.', 'success')
        resolve();
      }, err => {
        reject(err)
      });
    });
  }


  guardarHeaderComprobacion(comrpobacionHeader): Promise<void> {
    return new Promise((resolve, reject) => {
      // comrpobacionHeader.identificador_usuario = this.usuario.identificador_usuario;
      comrpobacionHeader.tipo_gasto = this.TIPO_GASTO;
      comrpobacionHeader.id_moneda = Number(comrpobacionHeader.id_moneda);
      comrpobacionHeader.recuperable = comrpobacionHeader.recuperable ? 1 : 0;
      this._comprobacionService.guardarHeaderComprobacion(comrpobacionHeader).subscribe((data: any) => {
        this.numero_comprobacion = data.data.folio_comprobacion;
        this.obtenerComprobacion();
        resolve();
      }, err => {
        reject(err)
      });
    });
  }


  obtenerComprobacion() {
    this._comprobacionService.obtenerHeaderBorrador(this.numero_comprobacion, (this.aprobacion_data && this.aprobacion_data.is_aprobacion) ? 1 : 0, this.usuario.identificador_usuario).subscribe((data: any) => {
      this.comprobacion_header = data.data;
      this.lista_comprobantes = this.comprobacion_header.comprobaciones;
      this.totales = { total_gastado: this.comprobacion_header.total_gastado, monto_reembolsable: this.comprobacion_header.monto_reembolsar, tipo_cambio: this.comprobacion_header.tipo_cambio };
      this.iniciarAprobacionParcial();
    }, err => console.log(err));
  }

  //#region  Obtencion de Catalogos
  obtenerCatalogos() {
    this.obtenerCuentas();
    this.obtenerMonedas();
    // this.obtenerAprobadores();
  }

  obtenerConsecutivoComprobacion(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._comprobacionService.obtenerConsecutivoComprobantePapel(this.comprobacion_header.identificador_usuario).subscribe((data: any) => {
        this.consecutivo_comprobante = data.data.folio_consecutivo;
        resolve(data.data.folio_consecutivo);
      }, err => reject(err));
    })
  }
  obtenerAprobadores(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._compartidoService.obtenerJefeInmediato(this.usuario.identificador_usuario).subscribe((data: any) => {
        this.comprobacion_header.nombre_usuario_aprobador = data.data.nombre
        this.comprobacion_header.identificador_aprobador = data.data.identificador_usuario
        resolve(data.data.nombre);
      }, err => reject(err));
    })
  }

  obtenerCuentas() {
    this._tipoGastoService.getlistCuentaAgrupacion(this.TIPO_GASTO.toString(), this.usuario.identificador_corporativo).subscribe((data: any) => {
      this.lista_cuentas = this.globals.prepararSelect2(data, 'id', 'nombre');
      this.lista_cuentas = this.globals.agregarSeleccione(this.lista_cuentas, 'Seleccione concepto...');
      this._comprobacionService.setCuentas(this.lista_cuentas);
    });
  }
  obtenerContribuyente() {
    this._compartidoService.getAllContribuyentesCorporativo(this.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_contribuyentes = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione contribuyente...');

    }, error => {
      console.log(error);
    })
  }
  obtenerCentrosCosto() {
    this._centroCostosService.ObtenerListaCentroCostosMXPorCorporativo(this.usuario.identificador_corporativo, this.usuario.identificador_usuario, Number(this.usuario.rol)).subscribe((data) => {
      this.lista_centros_costo = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_centros_costo = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_centros_costo = this.globals.agregarSeleccione(this.lista_centros_costo, 'Seleccione Centro Costo...');
    }, error => {
      console.log(error);
    })
  }

  obtenerMonedas() {
    this._compartidoService.obtenerMonedasCorporativo(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: Array<{ clave: string, id: number, nombre: string }>) => {
      this.lista_monedas = data;
      this.lista_monedas = this.lista_monedas.filter(moneda => moneda.clave.toLowerCase() !== 'xxx');
      this.lista_monedas = this.globals.prepararSelect2(this.lista_monedas, 'id', 'nombre');
      this.lista_monedas = this.globals.agregarSeleccione(this.lista_monedas, 'Seleccione moneda...');
      this._comprobacionService.setcatalogoMonedas(this.lista_monedas);
    });
  }

  //#endregion

  validarNumViaje(boton: any, obj: any) {
    const txt_boton = boton.innerHTML;
    boton.innerHTML = '';
    boton.disabled = true;
    boton.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>';
    this._gastoViajeService.validarSolicitud(this.numero_viaje).subscribe((data: any) => {
      this.id_solicitud = data.id;
      this.solicitud = data;
      boton.innerHTML = txt_boton;
      this.numero_viaje_valido = true;
      boton.disabled = false;
      this.obtenerCuentas();
    }, error => {
      boton.disabled = false;
      boton.innerHTML = txt_boton;
      if (error.error && error.error.mensaje) {
        Swal.fire('¡Error!', error.error.mensaje, 'error');
      } else {
        Swal.fire('¡Error!', 'Algo salio mal, por favor inténtelo de nuevo mas tarde.', 'error');
      }
    });
  }

  agregarComprobante(comprobante: DefaultCFDI) {
    comprobante.identificador_corporativo = this.usuario.identificador_corporativo;
    comprobante.identificador_contribuyente = this.comprobacion_header.identificador_compania;
    comprobante.identificador_usuario = this.usuario.identificador_usuario;
    comprobante.numero_comprobante = String(this.numero_comprobacion);
    comprobante.folio_comprobacion = this.numero_comprobacion;
    comprobante.tipo_cambio = this.comprobacion_header.tipo_cambio;
    comprobante.comprobante_papel = this.tipo_comprobante == 'internacional' ? 1 : 0;
    comprobante.tipo_movimiento = this.TIPO_MOVIMIENTO;
    this.show_loading = true;
    this._gastoViajeService.agregarComprobaciones(comprobante).subscribe((data: any) => {
      if (data.error_code && data.error_code === 400) {
        Swal.fire({
          title: `Error con el ${data.index + 1} documento.`,
          text: data.mensaje ? data.mensaje : 'Error en la validación del documento.',
          type: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ver Validación',
          cancelButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
          } else {
            this.router.navigateByUrl(`/home/comprobaciones/${this.URL_DOCUMENTO}`);
          }
        });
      } else if (data.error_code && data.error_code === 409) {
        Swal.fire('Error: ', data.mensaje ? data.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
      } else if (data.error_code == 200 || (data.error_code !== null && data.error_code === 0)) {
        this.totales.monto_reembolsable = data.monto;
        comprobante = null;
        this.tipo_comprobante = '';
        Swal.fire('¡Éxito!', data.mensaje ? data.mensaje : 'Comprobación agregada correctamente.', 'success');
        this.obtenerComprobacion();
      }
      // });
      this.show_loading = false;
    }, error => {
      this.show_loading = false;
      console.log(error);
      if (Array.isArray(error.error)) {
        error.error.forEach(element => {
          if (element.error_code && element.error_code === 409) {
            Swal.fire(`Error con el ${element.index + 1} documento`, element.mensaje ? element.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
          }
        });
      } else {
        if (error.error) {
          const err = error.error.mensaje;
          Swal.fire(`Error`, err ? err : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
        }
      }
    });
  }

  setTipoCambio(tipo_cambio: number) {
    this.tipo_cambio = tipo_cambio;
  }

  getValor(input) {
    input.value = input.value.trim()
    this.numero_viaje = input.value;
  }
  onTipoComprobanteSelect(tipo_comprobante) {
    this.tipo_comprobante = tipo_comprobante.value;
  }

  enviarConceptos(datos: any) {
    this.tipo_comprobante = '';
    if (!datos.extranjero) {
      this.lista_comprobaciones.push(datos);
      this.agregarComprobacion();
    } else {
      this.lista_comprobaciones.push(datos.data);
      this.agregarComprobacion(datos.header);
    }
  }
  actualizarFecha(data: any) {
    this.fecha_comprobante = data;
  }


  cancelar() {
    this.location.back();
  }
  cancelarCarga() {
    this.tipo_comprobante = '';
  }

  eliminarComprobacion() {
    Swal.fire({
      title: '',
      text: "¿Estas seguro que deseas eliminar la comprobación?,  ningún dato se  almacenará",
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.value) {
        if (this.numero_comprobacion) {
          this._comprobacionService.eliminarComprobacion(this.numero_comprobacion).subscribe((data) => {
          });
        }
        this.router.navigateByUrl(`/home/comprobaciones/${this.URL_DOCUMENTO}`);
      }
    })

  }

  agregarComprobacion(datos?: any) {
    if (!datos) {
      this.nueva_comprobacion.id_moneda = this.comprobacion_header.id_moneda;
      this.nueva_comprobacion.descripcion = this.comprobacion_header.descripcion;
      this.nueva_comprobacion.tipo_documento_id = 6;
      this.nueva_comprobacion.id_tipo_gasto = 1;
    } else {
      this.nueva_comprobacion = datos;
    }

    this.nueva_comprobacion.id_solicitud = Number(this.numero_comprobacion);
    this.nueva_comprobacion.identificador_contribuyente = this.comprobacion_header.identificador_compania;
    this.nueva_comprobacion.identificador_corporativo = this.usuario.identificador_corporativo;
    // this.nueva_comprobacion.identificador_departamento = this.comprobacion_header.identificador_departamento;
    this.nueva_comprobacion.identificador_usuario = this.comprobacion_header.identificador_usuario;
    // this.nueva_comprobacion.identificador_sucursal = this.comprobacion_header.
    // this.nueva_comprobacion.numero_comprobante = this.numero_viaje;  // uuid

    this.nueva_comprobacion.conceptos = [];
    this.lista_comprobaciones[this.lista_comprobaciones.length - 1].forEach(y => {
      this.nueva_comprobacion.conceptos.push(y);
      if (!this.nueva_comprobacion.fecha_comprobante) {
        this.nueva_comprobacion.fecha_comprobante = y.fecha_comprobante;
      }
      if (!this.nueva_comprobacion.numero_comprobante) {
        this.nueva_comprobacion.numero_comprobante = y.numero_comprobante;
      }
    });
    const com = { ...this.nueva_comprobacion, index: this.array_comprobaciones.length, lista_negra: this.usuario.lista_negra };
    this.array_comprobaciones.push(com);
  }

  comprobar(lista_comprobantes) {
    this.show_loading = true;
    const obj = {
      folio_comprobacion: this.numero_comprobacion,
      tipo_movimiento: this.TIPO_MOVIMIENTO,
      documentos: lista_comprobantes
    }
    this._gastoViajeService.finalizarComprobacion(obj).subscribe((data: any) => {
      this.show_loading = false;
      Swal.fire('¡Éxito! ', data.mensaje ? data.mensaje : 'Comprobación enviada a flujo de aprobación correctamente. ', 'success');
      this.router.navigateByUrl(`/home/comprobaciones/${this.URL_DOCUMENTO}`);
    }, err => {
      this.show_loading = false;
      console.log(err);
      Swal.fire('Error: ', err.error.mensaje ? err.error.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
    });
  }

  setArchivo(archivo) {
    this.nueva_comprobacion.xml = archivo;
    this.nueva_comprobacion.file = archivo;
  }

  setDetalles(detalle_factura) {
    this.tipo_comprobante === 'nacional' ? this.nueva_comprobacion.nacional = 1 : this.nueva_comprobacion.nacional = 0;
    if (detalle_factura.fecha_comprobante) {
      this.nueva_comprobacion.fecha_comprobante = detalle_factura.fecha_comprobante;
    } else {
      this.nueva_comprobacion.fecha_comprobante = detalle_factura.fecha;
    }
    this.nueva_comprobacion.forma_pago = detalle_factura.formaPago;
    this.nueva_comprobacion.moneda = detalle_factura.moneda;
    this.nueva_comprobacion.tipo_cambio = detalle_factura.tipoCambio;
    this.nueva_comprobacion.tipo_comprobante = detalle_factura.tipoDeComprobante;
    this.nueva_comprobacion.total = detalle_factura.total;
  }
  eliminarComprobante(data: { id_preliminar: number, id_documento: number, preliminar_detalle_id: number }) {
    this.show_loading = true;
    this._comprobacionService.eliminarComprobante(data.id_preliminar, data.id_documento, data.preliminar_detalle_id).subscribe(data => {
      console.log(data);
      this.show_loading = false;
      Swal.fire('¡Éxito!', 'Comprobante elimnado correctamente.', 'success');
      this.obtenerComprobacion();
    }, err => {
      console.log(err);
      this.show_loading = false;
      Swal.fire('¡Error!', err.error.mensaje || 'Error intentando procesar la solicitud.', 'error');
    })
  }

  procesarAprobacion(aprobacion: AprobacionParcial) {
    this.show_loading = true;
    aprobacion.header_preliminar_id = this.comprobacion_header.id;
    aprobacion.identificador_aprobador = this.usuario.identificador_usuario;
    aprobacion.tipo_gasto = this.TIPO_GASTO;
    this._bandejaAprobacionService.aprobarParcialmente(aprobacion).subscribe((data: any) => {
      this.show_loading = false;
      Swal.fire('¡Éxito!', data.mensaje || 'Comprobación aprobada.', 'success');
      this.cancelar();
    }, error => {
      this.show_loading = false;
      Swal.fire('¡Error!', error.error.mensaje || 'Error intentando procesar la solicitud', 'error');
    })
  }
  rechazarAprobacion(aprobacion: AprobacionParcial) {
    this.show_loading = true;
    aprobacion.header_preliminar_id = this.comprobacion_header.id;
    aprobacion.identificador_aprobador = this.usuario.identificador_usuario;
    aprobacion.tipo_gasto = this.TIPO_GASTO;
    this._bandejaAprobacionService.rechazarComprobacion(aprobacion).subscribe((data: any) => {
      this.show_loading = false;
      Swal.fire('¡Éxito!', data.mensaje || 'Comprobación rechazada.', 'success');
      this.cancelar();
    }, error => {
      this.show_loading = false;
      Swal.fire('¡Error!', error.error.mensaje || 'Error intentando procesar la solicitud', 'error');
    });
  }
  solicitarCambiosComprobacion(aprobacion: AprobacionParcial) {
    this.show_loading = true;
    aprobacion.header_preliminar_id = this.comprobacion_header.id;
    aprobacion.identificador_aprobador = this.usuario.identificador_usuario;
    aprobacion.tipo_gasto = this.TIPO_GASTO;
    this._bandejaAprobacionService.solicitarCambiosComprobacion(aprobacion).subscribe((data: any) => {
      this.show_loading = false;
      Swal.fire('¡Éxito!', data.mensaje || 'Solicitud de cambios enviada.', 'success');
      this.cancelar();
    }, error => {
      this.show_loading = false;
      Swal.fire('¡Error!', error.error.mensaje || 'Error intentando procesar la solicitud', 'error');
    });
  }

  iniciarAprobacionParcial() {
    this.aprobacion_parcial = new AprobacionParcial();
    this.aprobacion_parcial.header_preliminar_id = this.comprobacion_header.id;
    this.aprobacion_parcial.identificador_aprobador = this.usuario.identificador_usuario;
    this.aprobacion_parcial.tipo_gasto = this.TIPO_GASTO;

    this.lista_comprobantes = this.lista_comprobantes.map(comprobante => {
      comprobante.conceptos = comprobante.conceptos.map(concepto => {
        concepto.checked = true;
        return concepto;
      });
      return comprobante;
    })

    this.lista_comprobantes.forEach(comprobante => {
      comprobante.conceptos.forEach(concepto => {
        const aprob = new AprobacionParcialConcepto();
        aprob.preliminar_id = concepto.id;
        aprob.seleccionado = true;
        this.aprobacion_parcial.documentos.push(aprob);
      });
    })
  }

  onChangeTipoComprobante() {
    if (this.tipo_comprobante == 'internacional') {
      this.obtenerConsecutivoComprobacion();
    }
  }
}
