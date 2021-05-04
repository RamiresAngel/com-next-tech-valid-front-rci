import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AcreedorDiversoRD } from 'src/app/entidades/AcreedorDiversoRD';
import { Contribuyente, Usuario, Sucursal, Impuesto, Cuenta, ItemDocumentoRD, ArchivoCargar, HeaderGastosRD } from 'src/app/entidades';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormaPago } from 'src/app/entidades/forma-pago';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { IMyDpOptions } from 'mydatepicker';
import { ContribuyenteService } from 'src/app/modulos/contribuyente/contribuyente.service';
import { CatalogoImpuestosService } from '../../administracion/catalogo-impuestos/catalogo-impuestos.service';
import { CatalogoFormaPagoService } from '../../administracion/catalogo-forma-pago/catalogo-forma-pago.service';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { RowConceptosCargaDocsRdComponent } from 'src/app/compartidos/row-conceptos-carga-docs-rd/row-conceptos-carga-docs-rd.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-formulario-amortizacion-rd',
  templateUrl: './formulario-amortizacion-rd.component.html',
  styleUrls: ['./formulario-amortizacion-rd.component.css']
})
export class FormularioAmortizacionRdComponent {
  @ViewChild('rowConcepto') rowConcepto: RowConceptosCargaDocsRdComponent;
  // Variable par amostrar o no el boton guardar
  mostro_periodos: boolean;
  formulario: FormGroup;
  amortizacion = new HeaderGastosRD();
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

  usuario: Usuario;
  fecha_factura: string;
  inicio_periodo: string;
  fin_periodo: string;
  prorrateo: boolean;
  detalle_periodos: any[];
  total = 0;
  subtotal = 0;
  // Catalogos
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_acreedores = new Array<AcreedorDiversoRD>();
  lista_moneda = new Array<Moneda>();
  lista_impuesto = new Array<Impuesto>();
  lista_forma_pago = new Array<FormaPago>();
  lista_cuenta = new Array<Cuenta>();
  lista_cuenta_prorrateo = new Array<Cuenta>();

  lista_conceptos_agregados = new Array<ItemDocumentoRD>();
  lista_cuenta_seleccionada_prorrateo = new Array<any>();

  // identificador_header = 'dsfuhdsafk';
  identificador_header: string;
  public archivo_cargar: ArchivoCargar;

  constructor(
    private _compartidoService: CompartidosService,
    private _globals: GlobalsComponent,
    private _storage: StorageService,
    private _impuestosService: CatalogoImpuestosService,
    private _formaPagoService: CatalogoFormaPagoService,
    private _contribuyenteService: ContribuyenteService,
    private router: Router,
    private _impuestoService: CatalogoImpuestosService
  ) {
    this.usuario = this._storage.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.amortizacion.identificador_usuario = this.usuario.identificador_usuario;
    this.iniciarFormulario();
    this.obtenerDatosIniciales();
  }

  iniciarFormulario() {
    this.formulario = new FormGroup({
      contribuyente: new FormControl(this.amortizacion.identificador_contribuyente, Validators.required),
      sucursal: new FormControl(this.amortizacion.sucursal_identificador, Validators.required),
      acreedor: new FormControl(this.amortizacion.proveedor_identificador, Validators.required),
      cuenta: new FormControl(this.amortizacion.id_cuenta_agrupacion),
      // cuenta: new FormControl(this.amortizacion.id_cuenta_agrupacion, Validators.required)
      // nfc: new FormControl(this.amortizacion.rfc_proveedor, Validators.required),
      numero_comprobante: new FormControl(this.amortizacion.folio_fiscal, Validators.required),
      moneda: new FormControl(this.amortizacion.moneda, Validators.required),
      fecha_factura: new FormControl(this.amortizacion.fecha_factura, Validators.required),
      descripcion: new FormControl(this.amortizacion.descripcion, Validators.required),
      inicio_periodo: new FormControl(this.amortizacion.fecha_inicio_periodo, Validators.required),
      fin_periodo: new FormControl(this.amortizacion.fecha_fin_periodo, Validators.required),
      archivo: new FormControl(this.amortizacion.pdf, Validators.required),
    });
  }

  otenerPeriodos(btn: HTMLButtonElement) {
    const txt = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._compartidoService.obtenerPeriodosAmortizacion(this.identificador_header)
      .subscribe((data: any) => {
        btn.disabled = false;
        btn.innerHTML = 'Ver Periodos';
        this.detalle_periodos = data;
        $('#modal-periodos-amortizacion').modal('show');
        this.mostro_periodos = true;
      }, err => {
        btn.disabled = false;
        btn.innerHTML = txt;
        Swal.fire('¡Error!', 'Ocurrio un error intentando recuperar los periodos.', 'error');
      });
  }

  guardar(button: HTMLButtonElement) {
    const txt_btn = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._compartidoService.guardarAmortizacionRD(this.identificador_header).subscribe((data) => {
      this.router.navigateByUrl('/home/amortizacion');
      Swal.fire('¡Éxito!', 'Amortización creada correctamente. Se ha enviado a un flujo de aprobación.', 'success');
      button.disabled = false;
      button.innerHTML = txt_btn;
    }, err => {
      console.log(err.error);
      let mensaje = err.error.message ? err.error.message : '';
      if (err.error.length > 0) {
        mensaje = err.error[0].error.message;
      }
      button.disabled = false;
      button.innerHTML = txt_btn;
      Swal.fire('¡Error!', mensaje, 'error');
    });
  }

  //#region  Buffer Factura Header
  /**
   * Funcion que utiliza el servicio guardar header del gasto
   */

  guardarHeader(button?: HTMLButtonElement) {
    const txt_btn = button ? button.innerHTML : '';
    if (button) {
      button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:16px"></i>';
      button.disabled = true;
    }
    //  Tipo de movimiento Amortizacion
    this.amortizacion.tipo_gasto = 6;
    // Tipo de Movimiento Factura Acreedor
    this.amortizacion.tipo_movimiento_doc = 8;
    // Idnentificadores
    this.amortizacion.identificador_usuario = this.usuario.identificador_usuario;
    this._compartidoService.guardarHeaderGastoRD(this.amortizacion).subscribe((data: any) => {
      this.formulario.disable();
      this.identificador_header = data.identificador;
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
    }, error => {
      Swal.fire('¡Error!', error.error.error.message, 'error');
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
    });
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
      this.amortizacion.pdf = fileData.file_data;
      this.controls.archivo.setValue(file.name);
      this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }


  //#endregion

  //
  onContribuyenteSelected(data) {
    if (data.value != "0") {
      this.amortizacion.identificador_contribuyente = data.value;
      this.controls.contribuyente.setValue(data.value);
      this.obtenerSucursales(this.amortizacion.identificador_contribuyente);
      this.obtenerProveedores(this.amortizacion.identificador_contribuyente);
      if (this.amortizacion.proveedor_identificador) {
        this.obtenerCuentas();
      }
    } else {
      this.amortizacion.identificador_contribuyente = null;
      this.controls.contribuyente.setValue(null);
      this.obtenerSucursales(this.amortizacion.identificador_contribuyente);
      this.obtenerProveedores(this.amortizacion.identificador_contribuyente);
    }
  }
  onSucursalSelected(data) {
    if (data.value != "0") {
      this.amortizacion.sucursal_identificador = data.value;
      this.controls.sucursal.setValue(data.value);
    } else {
      this.amortizacion.sucursal_identificador = null;
      this.controls.sucursal.setValue(null);
    }
  }
  onAcreedorSelected(data) {

    if (data.value != "0") {
      this.amortizacion.proveedor_identificador = data.value;
      this.controls.acreedor.setValue(data.value);
      if (this.amortizacion.identificador_contribuyente) {
        this.obtenerCuentas();
      }
    } else {
      this.amortizacion.proveedor_identificador = null;
      this.controls.acreedor.setValue(null);
      if (this.amortizacion.identificador_contribuyente) {
        this.obtenerCuentas();
      }
    }

  }
  onMonedaSelected(data) {
    if (data.value != "0") {
      this.amortizacion.moneda = data.value;
      this.controls.moneda.setValue(data.value);
    } else {
      this.amortizacion.moneda = null;
      this.controls.moneda.setValue(null);
    }
  }
  onFechaFacturaSelected(data) {
    this.amortizacion.fecha_factura = data.formatted;
    this.controls.fecha_factura.setValue(data.formatted);
  }
  onInicioPeriodoSelected(data) {
    this.amortizacion.fecha_inicio_periodo = data.formatted;
    this.controls.inicio_periodo.setValue(data.formatted);
  }
  onFinPeriodoSelected(data) {
    if (data.formatted) {
      this.amortizacion.fecha_fin_periodo = data.formatted;
      this.controls.fin_periodo.setValue(data.formatted);
    } else {
      this.amortizacion.fecha_fin_periodo = null;
      this.controls.fin_periodo.setValue(null);
    }
  }
  onFormaPagoSelected(data) {
    if (data.value != "0") {
      this.amortizacion.forma_pago = data.value;
      this.controls.forma_pago.setValue(data.value);
    }
    else {
      this.amortizacion.forma_pago = null;
      this.controls.forma_pago.setValue(null);
    }

  }
  onCuentaSelected(data) {
    const obj_cuenta = data.value !== "0" && data.data[0] ? data.data[0] : null;
    if (obj_cuenta) {

      if (!this.prorrateo) {
        this.amortizacion.id_cuenta_agrupacion = obj_cuenta.cuenta_id;
        this.amortizacion.identificador_cuenta = obj_cuenta.identificador_cuenta;
        // this.amortizacion.deducible = obj_cuenta.deducible == 'True' ? 1 : 0;
        this.controls.cuenta.setValue(data.value);
      } else {
        this.amortizacion.id_cuenta_agrupacion = 0;
        this.lista_cuenta_seleccionada_prorrateo.length = 0;
        data.data.forEach(x => {
          this.lista_cuenta_seleccionada_prorrateo.push({ identificador_cuenta: x.identificador_cuenta });
        });
      }
    } else {
      this.amortizacion.identificador_cuenta = '';
      this.controls.cuenta.setValue(null);
    }
  }
  cambiarTipoCarga(prorrateo) {
    this.prorrateo = prorrateo;
  }

  // Llenar Catálogo
  obtenerDatosIniciales() {
    this.obtenerContribuyentes();
    this.obtenerMonedas();
    this.obtenerImpuestos();
    this.obtenerFormaPagos();
    this.obtenerCuentas();
  }

  obtenerContribuyentes() {
    if (this.usuario.proveedor == 1 || this.usuario.acreedor == 1) {
      this.obtenerContribuyentesSAP();
    } else {
      this.obtenerContribuyentesPortal();
    }
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
    this._compartidoService.obtenerAcreedoresContribuyente(identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_acreedores = this._globals.prepararSelect2(data, 'identificador_proveedor', 'proveedor');
        this.lista_acreedores = this._globals.agregarSeleccione(this.lista_acreedores, 'Seleccione Proveedor...');
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
    console.log(this.amortizacion);

    this._contribuyenteService.obtenerUsuarioCuentas_by(this.amortizacion.identificador_contribuyente, 5, this.amortizacion.proveedor_identificador).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta + ':' + obj.identificador_departamento + '|' + obj.deducible;
          obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta + ' - ' + obj.departamento;
          return obj;
        });
        this.lista_cuenta = this._globals.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_cuenta = this._globals.agregarSeleccione(this.lista_cuenta, 'Selecciona...');
      }
      , (error) => {
        console.log(error);
      }
    );
    // Cuentas Con Prorrateo
    this._contribuyenteService.obtenerUsuarioCuentas_byProrrateo(this.amortizacion.identificador_contribuyente, 5, this.amortizacion.proveedor_identificador).subscribe(
      (data: any) => {
        // const aux = data.map(obj => {
        //   obj.identificador = obj.identificador_cuenta + '|' + obj.deducible;
        //   obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta;
        //   return obj;
        // });
        this.lista_cuenta_prorrateo = this._globals.prepararSelect2(data, 'identificador', 'texto');
        this.lista_cuenta_prorrateo = this._globals.agregarSeleccione(this.lista_cuenta_prorrateo, 'Selecciona...');
      }
      , (error) => {
        console.log(error);
      }
    );
  }
  obtenerCatalogoImpuestos() {
    this._impuestoService.obtenerImpuestos(this.identificador_corporativo).subscribe((data: Array<Impuesto>) => {
      this.lista_impuesto = data;
    }, err => {
      console.log(err);
    })
  }

  async agregarItem(event) {
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
    console.log(concepto);
    this._compartidoService.eliminarDetalleDocumentoRD(concepto.id).subscribe((totales: any) => {
      this.total = totales.total;
      this.subtotal = totales.subtotal;
      this.lista_conceptos_agregados = this.lista_conceptos_agregados.filter(x => x.concepto !== concepto.concepto);
    });
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

  calcularTotales() {
    this.subtotal = 0;
    this.total = 0;
    this.lista_conceptos_agregados.forEach(concepto => {
      this.subtotal += concepto.importe;
      this.total += this.subtotal + (concepto.cantidad * concepto.monto_impuesto);
    });
  }
  seleccionarArchivo(archivo: ArchivoCargar) {
    this.archivo_cargar = archivo;
    console.log(this.formulario);

    this.controls.archivo.setValue(archivo);
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }
}
