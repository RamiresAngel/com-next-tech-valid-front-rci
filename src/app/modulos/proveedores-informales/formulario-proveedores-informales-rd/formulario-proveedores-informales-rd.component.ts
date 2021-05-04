import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AcreedorDiversoRD } from 'src/app/entidades/AcreedorDiversoRD';
import { Contribuyente, Usuario, Sucursal, Impuesto, Cuenta, ItemDocumentoRD, ArchivoCargar, HeaderGastosRD, CuentaProrrateo, TipoRetencion, CondicionPagoRD } from 'src/app/entidades';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormaPago } from 'src/app/entidades/forma-pago';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { IMyDpOptions } from 'mydatepicker';
import { ContribuyenteService } from 'src/app/modulos/contribuyente/contribuyente.service';
import { RowConceptosCargaDocsRdComponent } from 'src/app/compartidos/row-conceptos-carga-docs-rd/row-conceptos-carga-docs-rd.component';
import Swal from 'sweetalert2';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { Router } from '@angular/router';
import { ModalProrrateoComponent } from '../../acreedores-diversos/modal-prorrateo/modal-prorrateo.component';
import { CatalogoImpuestosService } from '../../administracion/catalogo-impuestos/catalogo-impuestos.service';
import { CatalogoFormaPagoService } from '../../administracion/catalogo-forma-pago/catalogo-forma-pago.service';
import { CatalogoTipoRetencionService } from '../../administracion/catalogo-tipo-retencion/catalogo-tipo-retencion.service';
import { CuentaService } from '../../cuenta/cuenta.service';
import { ProveedoresInformalesService } from '../proveedores-informales.service';
declare var $: any;
@Component({
  selector: 'app-formulario-proveedores-informales-rd',
  templateUrl: './formulario-proveedores-informales-rd.component.html',
  styleUrls: ['./formulario-proveedores-informales-rd.component.css']
})
export class FormularioProveedoresInformalesRdComponent {
  @ViewChild('rowConcepto') rowConcepto: RowConceptosCargaDocsRdComponent;
  @ViewChild('modalProrrateo') modalProrrateo: ModalProrrateoComponent;
  @Input() lista_paises = new Array();

  readonly id_tipo_gasto = 10;
  readonly id_tipo_documento = 12;
  paise_seleccioando = 'DO';
  retencion_guardada = false;
  public retencion_monto = 0;


  formulario: FormGroup;
  proveedor_informal = new HeaderGastosRD();
  identificador_corporativo: string;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  retenciones = new TipoRetencion();
  usuario: Usuario;
  fecha_factura: string;
  prorrateo: boolean
  public archivo_cargar: ArchivoCargar;
  total = 0;
  subtotal = 0;
  // Catalogos
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_proveedores_inf = new Array<AcreedorDiversoRD>();
  lista_moneda = new Array<Moneda>();
  lista_impuesto = new Array<Impuesto>();
  lista_forma_pago = new Array<FormaPago>();
  lista_cuenta = new Array<Cuenta>();
  lista_cuenta_prorrateo = new Array<Cuenta>();
  lista_ciudades = new Array<{ id: number, nombre: string }>();
  lista_retenciones = new Array<TipoRetencion>();
  // lista_paises = new Array();
  lista_condicion_pago = new Array<CondicionPagoRD>();

  lista_cuenta_seleccionada_prorrateo = new Array<any>();
  lista_departamentos_prorrateo = new Array<any>();
  lista_conceptos_agregados = new Array<ItemDocumentoRD>();

  // identificador_header = 'dskjahfds';
  identificador_header: string;

  constructor(
    private _compartidoService: CompartidosService,
    public _globals: GlobalsComponent,
    private _storage: StorageService,
    private _impuestosService: CatalogoImpuestosService,
    private _formaPagoService: CatalogoFormaPagoService,
    private _tipoRetencionService: CatalogoTipoRetencionService,
    private _cuentaService: CuentaService,
    private router: Router,
    private _proveedorInfService: ProveedoresInformalesService,
    private _contribuyenteService: ContribuyenteService
  ) {
    this.usuario = this._storage.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.iniciarFormulario();
    this.obtenerDatosIniciales();
  }

  //#region Buffer Factura Header

  /**
   * Inicia el formulario
   */
  iniciarFormulario() {
    this.formulario = new FormGroup({
      contribuyente: new FormControl(this.proveedor_informal.identificador_contribuyente, Validators.required),
      sucursal: new FormControl(this.proveedor_informal.sucursal_identificador, Validators.required),
      proveedor: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      id_cuenta_agrupacion: new FormControl(this.proveedor_informal.id_cuenta_agrupacion, Validators.required),
      identificador_cuenta: new FormControl(this.proveedor_informal.identificador_cuenta),
      nombre_proveedor: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      calle: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      municipio: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      ciudad: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      codigo_postal: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      pais: new FormControl(this.proveedor_informal.proveedor_identificador, Validators.required),
      cuenta: new FormControl(this.proveedor_informal.identificador_cuenta, Validators.required),
      moneda: new FormControl(this.proveedor_informal.moneda, Validators.required),
      fecha_factura: new FormControl(this.proveedor_informal.fecha_factura, Validators.required),
      descripcion: new FormControl(this.proveedor_informal.descripcion, Validators.required),
      numero_comprobante: new FormControl(this.proveedor_informal.folio_fiscal, Validators.required),
      archivo: new FormControl(this.archivo_cargar, Validators.required)
    });
  }
  /**
   * Funcion que utiliza el servicio guardar header del gasto
   */
  async guardarHeader(button?: HTMLButtonElement) {
    const txt_btn = button ? button.innerHTML : '';
    if (button) {
      button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:16px"></i>';
      button.disabled = true;
    }
    //  Tipo de movimiento acreedor diverso
    this.proveedor_informal.tipo_gasto = this.id_tipo_gasto;
    // Tipo de Movimiento Factura Acreedor
    this.proveedor_informal.tipo_movimiento_doc = this.id_tipo_documento;
    this.proveedor_informal.identificador_usuario = this.usuario.identificador_usuario;
    console.log(this.proveedor_informal);
    console.log(this.formulario);
    this._compartidoService.guardarHeaderGastoRD(this.proveedor_informal).subscribe((data: any) => {
      this.formulario.disable();
      this.identificador_header = data.identificador;
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
    }, error => {
      Swal.fire('Error!', error.error.error.message, 'error');
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
    });
  }

  /***
   */
  async finalizar(button: HTMLButtonElement) {
    const txt_btn = button ? button.innerHTML : '';
    if (button) {
      button.disabled = true;
      button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    }
    try {
      if (!this.retencion_guardada) {
        await this.guardarRetencion();
      }
      await this.guardar();
      button.disabled = false;
      button.innerHTML = txt_btn;
    } catch (error) {
      console.log(error);
      button.disabled = false;
      button.innerHTML = txt_btn;
    }
  }

  /***
   * Finaliza la trnasaccion enviado el identificador
   * enviando el identificador de la transaccion
   */
  guardar(button?: HTMLButtonElement) {
    return new Promise((resolve, reject) => {
      const txt_btn = button ? button.innerHTML : '';
      if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
      }
      this._compartidoService.guardarProveedorInformalRD(this.identificador_header).subscribe((data: any) => {
        if (button) {
          button.disabled = false;
          button.innerHTML = txt_btn;
        }
        $('#modal-deptos').modal('hide');
        this.router.navigateByUrl('/home/proveedores_informales/list');
        Swal.fire('¡Éxito!', 'Cargado correctamente. Se envio a flujo de aprobación. ', 'success');
        resolve(data);
        if (button) {
          button.disabled = false;
          button.innerHTML = txt_btn;
        }
      }, err => {
        console.log(err.error);
        let mensaje = err.error.message ? err.error.message : '';
        if (err.error.length > 0) {
          mensaje = err.error[0].error.message;
        }
        reject(err);
        Swal.fire('Error', mensaje, 'error');
        if (button) {
          button.disabled = false;
          button.innerHTML = txt_btn;
        }
      });
    })
  }

  /**
   * Guarda la retenciones y si responde OK
   * finaliza la tranasaccion
   */
  guardarRetencion(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._proveedorInfService.guardarRetencion(this.identificador_header, this.retenciones)
        .subscribe((data: any) => {
          this.retencion_guardada = true;
          resolve();
        }, error => {
          const mensaje = error.error && error.error.message ? error.error.message : 'Error intentando guardar retenciones.';
          reject('Error en prorrateo');
          Swal.fire('¡Error!', mensaje, 'error');
        });
    });
  }

  /**
   * Guarda el prorreteo con las cuentas seleccionadas
   * @param lista_cuentas_prorrateo Cuentas seleccionadas para prorratear
   */
  guardarProrrateo(lista_cuentas_prorrateo: CuentaProrrateo[]) {
    return new Promise((resolve, reject) => {
      this._compartidoService.guardarCuentasProrrateoAcreedoresRD(this.identificador_header, lista_cuentas_prorrateo)
        .subscribe((data) => {
          if (this.modalProrrateo) {
            this.modalProrrateo.actualizarBoton();
          }
          this.guardarRetencion();
          resolve(data);
        }, err => {
          const mensaje = err.error && err.error.message ? err.error.message : 'Error intentando guardar retenciones.';
          reject('Error en prorrateo');
          Swal.fire('¡Error!', mensaje, 'error');
        });
    });
  }

  //#region  Manejador de Select2
  onContribuyenteSelected(data) {
    this.proveedor_informal.identificador_contribuyente = data.value;
    this.controls.contribuyente.setValue(data.value)
    this.obtenerSucursales(this.proveedor_informal.identificador_contribuyente);
    this.obtenerProveedores(this.proveedor_informal.identificador_contribuyente);
  }
  onSucursalSelected(data) {
    this.proveedor_informal.sucursal_identificador = data.value;
    this.controls.sucursal.setValue(data.value);
  }
  onProveedorSelected(data) {
    if (data && data.value !== "0") {
      this.proveedor_informal.proveedor_identificador = data.value;
      // this.proveedor_informal.nombre_proveedor = data.data[0].proveedor;
      this.controls.proveedor.setValue(data.value);
      this.obtenerCuentas();
    }
  }

  onCiudadSelected(data) {
    if (data.value != "0") {
      this.proveedor_informal.ciudad = data.value;
      this.controls.ciudad.setValue(data.value);
    } else {
      this.proveedor_informal.ciudad = '';
      this.controls.ciudad.setValue(null);
    }

  }

  onMonedaSelected(data) {
    this.proveedor_informal.moneda = data.value;
    this.controls.moneda.setValue(data.value);
  }
  onFechaFacturaSelected(data) {
    this.proveedor_informal.fecha_factura = data.formatted;
    this.controls.fecha_factura.setValue(data.formatted);
  }
  onCondicionSelected(data) {
    if (data.value !== '') {
      this.proveedor_informal.condicion_pago = data.value;
      this.controls.fecha_factura.setValue(data.value);
    } else {
      this.controls.condicion_pago = null;
      this.controls.condicion_pago.setValue(null);
    }
  }
  onCuentaSelected(data) {
    const obj_cuenta = data.value !== "0" && data.data[0] ? data.data[0] : null;
    if (obj_cuenta) {
      // Si no es prorrateo id_cuenta es requerido
      if (!this.prorrateo) {
        console.log(obj_cuenta);
        this.proveedor_informal.id_cuenta_agrupacion = Number(obj_cuenta.id);
        this.proveedor_informal.identificador_cuenta = obj_cuenta.identificador_cuenta;
        // this.proveedor_informal.deducible = obj_cuenta.deducible == 'True' ? 1 : 0;
        this.controls.cuenta.setValue(data.value);
        this.controls.id_cuenta_agrupacion.setValue(obj_cuenta.id);
        this.controls.identificador_cuenta.setValue(obj_cuenta.id);
        // Si no es prorrateo las cuentas no son requeridas
      } else {
        this.proveedor_informal.id_cuenta_agrupacion = 0;
        this.lista_cuenta_seleccionada_prorrateo.length = 0;
        data.data.forEach(x => {
          this.lista_cuenta_seleccionada_prorrateo.push({ identificador_cuenta: x.identificador_cuenta });
        });
      }
    } else {
      this.proveedor_informal.identificador_cuenta = '';
      this.controls.cuenta.setValue(null);
    }
    console.log(this.formulario.controls);
  }
  cambiarTipoCarga(prorrateo) {
    this.prorrateo = prorrateo;
    this.proveedor_informal.prorrateo = prorrateo ? 1 : 0;
    this.controls.id_cuenta_agrupacion.setValue(null);
    this.controls.identificador_cuenta.setValue(null);
    if (prorrateo) {
      this.controls.id_cuenta_agrupacion.clearValidators();
      this.controls.identificador_cuenta.clearValidators();
      this.controls.cuenta.clearValidators();
      this.controls.id_cuenta_agrupacion.updateValueAndValidity();
      this.controls.cuenta.updateValueAndValidity();
      this.controls.identificador_cuenta.updateValueAndValidity();
    } else {
      this.controls.id_cuenta_agrupacion.setValidators(Validators.required);
      this.controls.identificador_cuenta.setValidators(Validators.required);
      this.controls.id_cuenta_agrupacion.updateValueAndValidity();
      this.controls.identificador_cuenta.updateValueAndValidity();
    }
    console.log(this.formulario.controls);
  }

  cargarArchivo(input_archivo: HTMLInputElement, input_txt: HTMLInputElement, tipo: string) {
    const reader = new FileReader();
    const fileData = new FileUpload();
    const file = input_archivo.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      fileData.file_name = file.name;
      fileData.file_data = reader.result.toString().split(',')[1];
      input_txt.value = file.name;
      this.proveedor_informal.pdf = fileData.file_data;
      this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }

  seleccionarArchivo(archivo: ArchivoCargar) {
    this.archivo_cargar = archivo;
    this.controls.archivo.setValue(archivo);
  }


  onRetencionSelected(value) {
    console.log(value);
    if (value.data && value.data.length > 0 && this.subtotal > 0) {
      const retencion_seleccionada: TipoRetencion = value.data[0];
      this.retenciones.identificador_header = this.identificador_header;
      this.retenciones.descripcion_tipo = retencion_seleccionada.descripcion_tipo;
      this.retenciones.tasa = Number(retencion_seleccionada.porcentaje) / 100;
      this.retenciones.importe = this.subtotal * this.retenciones.tasa;
      this.retenciones.tipo_retencion_id = Number(retencion_seleccionada.id);
      this.retenciones.local = 1;
      this.retencion_monto = this.retenciones.importe;
      this.retenciones.id = 0;
    }
  }

  //#endregion

  //#region Llenar Catálogos
  obtenerDatosIniciales() {
    this.obtenerContribuyentes();
    this.obtenerMonedas();
    this.obtenerImpuestos();
    this.obtenerFormaPagos();
    this.obtenerCuentas();
    this.obtenerLocalidades();
    this.obtenerRetenciones();
    this.obtenerCondicionesPago();
    if (this._globals.lista_paises_rd.length == 0) {
      this.obtenerPaises();
    }
  }

  obtenerDepartamentosProrrateo() {
    this._contribuyenteService.obtenerDepartamentoProrrateoArrayCuentas(
      this.proveedor_informal.identificador_contribuyente, this.id_tipo_gasto,
      this.proveedor_informal.proveedor_identificador,
      this.lista_cuenta_seleccionada_prorrateo,
      this.proveedor_informal.sucursal_identificador)
      .subscribe((data: any) => {
        this.lista_departamentos_prorrateo = data;

        $('#modal-deptos').modal('show');
      });
  }


  obtenerRetenciones() {
    this._tipoRetencionService.obtenerTiposRetencion(this.usuario.identificador_corporativo).subscribe((retenciones: TipoRetencion[]) => {
      this.lista_retenciones = retenciones;
    }, err => {
      console.log(err);
      const mensaje = err.error && err.error.mensaje ? err.error.mensaje : 'No se pudieron obtener tipos de retenciones.';
      Swal.fire('Error', mensaje, 'error');
    });
  }
  obtenerContribuyentes() {
    if (this.usuario.proveedor == 1 || this.usuario.acreedor == 1) {
      this.obtenerContribuyentesSAP();
    } else {
      this.obtenerContribuyentesPortal();
    }
  }

  obtenerLocalidades() {
    this._compartidoService.obtenerLocalidades().subscribe((localidades: any) => {
      this.lista_ciudades = this._globals.prepararSelect2(localidades, 'id', 'nombre');
    }, error => {
      console.log(error);
      Swal.fire('Error', 'No se pudieron obtener las localidades.', 'error');
    });
  }
  obtenerContribuyentesSAP() {
    this._compartidoService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe((data: Array<Contribuyente>) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
      }, err => {
        this.lista_contribuyentes.length = 0;
        console.log(err);
      });
  }
  obtenerContribuyentesPortal() {
    this._compartidoService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe((data: Array<Contribuyente>) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        this.lista_contribuyentes.length = 0;
        console.log(err);
      });
  }

  obtenerSucursales(identificador_contribuyente: string) {
    this._compartidoService.obtenerSucursalesXCorporativoXContribuyente(this.usuario.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: Array<Sucursal>) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        console.log(err);
      });
  }

  obtenerProveedores(identificador_contribuyente) {
    this._compartidoService.obtenerproveedorInformalontribuyente(identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_proveedores_inf = this._globals.prepararSelect2(data, 'identificador_proveedor', 'proveedor');
        this.lista_proveedores_inf = this._globals.agregarSeleccione(this.lista_proveedores_inf, 'Seleccione Proveedor...');
      },
        error => {
          console.log(error);
        }
      );
  }

  obtenerMonedas() {
    this._compartidoService.obtenerMonedasCorporativo(this.usuario.identificador_corporativo).subscribe(
      (data) => {
        this.lista_moneda = this._globals.prepararSelect2(data, 'clave', 'nombre');
        this.lista_moneda = this._globals.agregarSeleccione(data, 'Selecciona una moneda');
      }
      , (error) => {
        console.log(error);
      });
  }

  obtenerImpuestos() {
    this._impuestosService.obtenerImpuestos(this.usuario.identificador_corporativo).subscribe((data: Array<Impuesto>) => {
      this.lista_impuesto = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_impuesto = this._globals.agregarSeleccione(data, 'Seleccione Impuesto');
    }, err => {
      console.log(err);
      Swal.fire('¡Error!', 'No se pudieron obtener impuestos por favor, intente de nuevo mas tarde.', 'error')
    });
  }
  obtenerCondicionesPago() {
    this._compartidoService.obtenerCondicionPago().subscribe((data: Array<Impuesto>) => {
      this.lista_condicion_pago = this._globals.prepararSelect2(data, 'clave', 'nombre');
    }, err => {
      console.log(err);
    });
  }


  obtenerFormaPagos() {
    this._formaPagoService.obtenerFormasPago(this.usuario.identificador_corporativo).subscribe((data: Array<FormaPago>) => {
      this.lista_forma_pago = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_forma_pago = this._globals.agregarSeleccione(data, 'Seleccione Forma de Pago');
    }, err => {
      console.log(err);
    });
  }

  obtenerCuentas() {
    // Cuentas Sin Prorrateo
    console.log(this.proveedor_informal);
    // this._cuentaService.obtenerCuentaCorporativo(this.usuario.identificador_corporativo).subscribe(
    this._contribuyenteService.obtenerUsuarioCuentas_by(this.proveedor_informal.identificador_contribuyente, 10, this.proveedor_informal.proveedor_identificador).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta + ' - ' + obj.departamento;
          return obj;
        });
        this.lista_cuenta = this._globals.prepararSelect2(aux, 'identificador_cuenta', 'texto');
        this.lista_cuenta = this._globals.agregarSeleccione(this.lista_cuenta, 'Selecciona...');
      }
      , (error) => {
        console.log(error);
      }
    );
    // Cuentas Con Prorrateo
    this._proveedorInfService.cuentasProrrareoByProveedorInformal().subscribe(
      (data: any) => {
        this.lista_cuenta_prorrateo = this._globals.prepararSelect2(data, 'identificador_cuenta', 'cuenta');
        this.lista_cuenta_prorrateo = this._globals.agregarSeleccione(this.lista_cuenta_prorrateo, 'Selecciona...');
      }
      , (error) => {
        console.log(error);
      }
    );
  }
  obtenerCatalogoImpuestos() {
    this._impuestosService.obtenerImpuestos(this.identificador_corporativo).subscribe((data: Array<Impuesto>) => {
      this.lista_impuesto = data;
    }, err => {
      console.log(err);
    })
  }

  obtenerPaises() {
    this._compartidoService.obtenerCatalogoPaises().subscribe((data: Array<any>) => {
      this.enviarPaises(data);
    }, err => {
      this.enviarPaises([]);
    });
  }

  enviarPaises(paises: any[]) {
    this._globals.lista_paises_rd = paises;
  }

  //#endregion

  async agregarItem(event: ItemDocumentoRD) {
    // this.lista_conceptos_agregados.push(event);
    event.cantidad = Number(event.cantidad)
    event.impuestos = event.impuestos.map(imp => { imp.tasa = Number(imp.tasa); return imp; })
    event.identificador_header = this.identificador_header;
    console.log(event);
    try {
      event.id = await this.guardarDetails(event);
      this.lista_conceptos_agregados.push(event);
      this.rowConcepto.limpiarItem();
    } catch (error) {
      console.log(error.error.message);
      Swal.fire('¡Error!', error.error.message, 'error');
    }
  }

  eliminarConcepto(concepto) {
    this.lista_conceptos_agregados = this.lista_conceptos_agregados.filter(x => x.concepto !== concepto.concepto)
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = 0;
    this.total = 0;
    this.lista_conceptos_agregados.forEach(concepto => {
      this.subtotal += concepto.importe;
      this.total += this.subtotal + (concepto.cantidad * concepto.monto_impuesto);
    });
    this.retenciones.importe = this.subtotal * this.retenciones.tasa;
    this.retencion_monto = this.retenciones.importe;
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  guardarDetails(detalle: ItemDocumentoRD): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      this._compartidoService.guardarDetalleDocumentoRD(detalle).subscribe((totales: any) => {
        this.total = totales.total;
        this.subtotal = totales.subtotal;
        resolve(totales.id);
      }, err => {
        reject(err);
      });
    });

    return promise;
  }

  onSetMontoRetencion(value) {
    // console.log(value);
    // this.retencion_monto = value;
    // this.retenciones.importe = this.retencion_monto;
  }

}
