import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AcreedorDiversoRD } from 'src/app/entidades/AcreedorDiversoRD';
import { Contribuyente, Usuario, Sucursal, Impuesto, Cuenta, ItemDocumentoRD, ArchivoCargar, HeaderGastosRD, CuentaProrrateo } from 'src/app/entidades';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormaPago } from 'src/app/entidades/forma-pago';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { CatalogoImpuestosService } from '../../../administracion/catalogo-impuestos/catalogo-impuestos.service';
import { CatalogoFormaPagoService } from '../../../administracion/catalogo-forma-pago/catalogo-forma-pago.service';
import { IMyDpOptions } from 'mydatepicker';
import { ContribuyenteService } from 'src/app/modulos/contribuyente/contribuyente.service';
import { RowConceptosCargaDocsRdComponent } from 'src/app/compartidos/row-conceptos-carga-docs-rd/row-conceptos-carga-docs-rd.component';
import Swal from 'sweetalert2';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { Router } from '@angular/router';
import { ModalProrrateoComponent } from '../../modal-prorrateo/modal-prorrateo.component';
declare var $: any;
@Component({
  selector: 'app-formulario-acreedores-diversos-rd',
  templateUrl: './formulario-acreedores-diversos-rd.component.html',
  styleUrls: ['./formulario-acreedores-diversos-rd.component.css']
})
export class FormularioAcreedoresDiversosRdComponent {
  @ViewChild('rowConcepto') rowConcepto: RowConceptosCargaDocsRdComponent;
  @ViewChild('modalProrrateo') modalProrrateo: ModalProrrateoComponent;

  formulario: FormGroup;
  acreedor_diverso = new HeaderGastosRD();
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
  prorrateo: boolean
  public archivo_cargar: ArchivoCargar;
  total = 0;
  subtotal = 0;
  prorrateo_guardado = false;
  // Catalogos
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_acreedores = new Array<AcreedorDiversoRD>();
  lista_moneda = new Array<Moneda>();
  lista_impuesto = new Array<Impuesto>();
  lista_forma_pago = new Array<FormaPago>();
  lista_cuenta = new Array<Cuenta>();
  lista_cuenta_prorrateo = new Array<Cuenta>();

  lista_cuenta_seleccionada_prorrateo = new Array<any>();
  lista_departamentos_prorrateo = new Array<any>();
  lista_conceptos_agregados = new Array<ItemDocumentoRD>();

  // identificador_header = 'dskjahfds';
  identificador_header: string;

  constructor(
    private _compartidoService: CompartidosService,
    private _globals: GlobalsComponent,
    private _storage: StorageService,
    private _impuestosService: CatalogoImpuestosService,
    private _formaPagoService: CatalogoFormaPagoService,
    private router: Router,
    private _contribuyenteService: ContribuyenteService,
    private _impuestoService: CatalogoImpuestosService
  ) {
    this.usuario = this._storage.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.iniciarFormulario();
    this.obtenerDatosIniciales();
  }

  //#region Buffer Factura Header

  iniciarFormulario() {
    this.formulario = new FormGroup({
      contribuyente: new FormControl(this.acreedor_diverso.identificador_contribuyente, Validators.required),
      sucursal: new FormControl(this.acreedor_diverso.sucursal_identificador, Validators.required),
      acreedor: new FormControl(this.acreedor_diverso.proveedor_identificador, Validators.required),
      descripcion: new FormControl(this.acreedor_diverso.descripcion, Validators.required),
      numero_comprobante: new FormControl(this.acreedor_diverso.folio_fiscal, Validators.required),
      // nfc: new FormControl(this.acreedor_diverso.rfc_proveedor, Validators.required),
      moneda: new FormControl(this.acreedor_diverso.moneda, Validators.required),
      fecha_factura: new FormControl(this.acreedor_diverso.fecha_factura, Validators.required),
      cuenta: new FormControl(this.acreedor_diverso.identificador_cuenta, Validators.required),
      archivo: new FormControl(this.archivo_cargar, Validators.required)
    });
  }


  /**
   * Funcion que utiliza el servicio guardar header del gasto
   */

  guardarHeader(button?: HTMLButtonElement) {
    const txt_btn = button ? button.innerHTML : '';
    if (button) {
      button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:16px"></i>';
      button.disabled = true;
    }
    //  Tipo de movimiento acreedor diverso
    this.acreedor_diverso.tipo_gasto = 5;
    // Tipo de Movimiento Factura Acreedor
    this.acreedor_diverso.tipo_movimiento_doc = 8;
    this.acreedor_diverso.identificador_usuario = this.usuario.identificador_usuario;
    console.log(this.acreedor_diverso);
    console.log(this.formulario);
    this._compartidoService.guardarHeaderGastoRD(this.acreedor_diverso).subscribe((data: any) => {
      console.log(data);
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

  guardarProrrateo(lista_cuentas_prorrateo: CuentaProrrateo[]) {
    if (!this.prorrateo_guardado) {
      this._compartidoService.guardarCuentasProrrateoAcreedoresRD(this.identificador_header, lista_cuentas_prorrateo)
        .subscribe((data) => {
          this.prorrateo_guardado = true;
          this.guardar();
        }, err => {
          console.log(err);
          if (this.modalProrrateo) {
            this.modalProrrateo.actualizarBoton();
          }
        });
    } else {
      this.guardar();
    }

  }

  onContribuyenteSelected(data) {
    console.log(data);
    this.acreedor_diverso.identificador_contribuyente = data.value;
    this.controls.contribuyente.setValue(data.value)
    this.obtenerSucursales(this.acreedor_diverso.identificador_contribuyente);
    this.obtenerProveedores(this.acreedor_diverso.identificador_contribuyente);
    if (this.acreedor_diverso.proveedor_identificador) {
      this.obtenerCuentas();
    }
  }
  onSucursalSelected(data) {
    console.log(data);
    this.acreedor_diverso.sucursal_identificador = data.value;
    this.controls.sucursal.setValue(data.value);
  }
  onAcreedorSelected(data) {
    console.log(data);
    if (data && data.value !== "0") {
      this.acreedor_diverso.proveedor_identificador = data.value;
      this.acreedor_diverso.nombre_proveedor = data.data[0].proveedor;
      this.controls.acreedor.setValue(data.value);
      if (this.acreedor_diverso.identificador_contribuyente) {
        this.obtenerCuentas();
      }
    }
  }
  onMonedaSelected(data) {
    console.log(data);
    this.acreedor_diverso.moneda = data.value;
    this.controls.moneda.setValue(data.value);
  }
  onFechaFacturaSelected(data) {
    console.log(data);
    this.acreedor_diverso.fecha_factura = data.formatted;
    this.controls.fecha_factura.setValue(data.formatted);
  }
  onCuentaSelected(data) {
    console.log(data);
    const obj_cuenta = data.value !== "0" && data.data[0] ? data.data[0] : null;
    if (obj_cuenta) {

      if (!this.prorrateo) {
        this.acreedor_diverso.id_cuenta_agrupacion = obj_cuenta.cuenta_id;
        this.acreedor_diverso.identificador_cuenta = obj_cuenta.identificador_cuenta;
        // this.acreedor_diverso.deducible = obj_cuenta.deducible == 'True' ? 1 : 0;
        this.controls.cuenta.setValue(data.value);
      } else {
        this.acreedor_diverso.id_cuenta_agrupacion = 0;
        this.lista_cuenta_seleccionada_prorrateo.length = 0;
        data.data.forEach(x => {
          this.lista_cuenta_seleccionada_prorrateo.push({ identificador_cuenta: x.identificador_cuenta });
        });
      }
    } else {
      this.acreedor_diverso.identificador_cuenta = '';
      this.controls.cuenta.setValue(null);
    }
  }
  cambiarTipoCarga(prorrateo) {
    this.prorrateo = prorrateo;
    this.acreedor_diverso.prorrateo = prorrateo ? 1 : 0;
    if (prorrateo) {
      this.controls.cuenta.clearValidators();
      this.controls.cuenta.updateValueAndValidity();
    } else {
      this.controls.cuenta.setValidators(Validators.required);
      this.controls.cuenta.updateValueAndValidity();
    }
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
      this.acreedor_diverso.pdf = fileData.file_data;
      this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }

  seleccionarArchivo(archivo: ArchivoCargar) {
    this.archivo_cargar = archivo;
    console.log(this.formulario);
    this.controls.archivo.setValue(archivo);
  }
  //#endregion


  obtenerDepartamentosProrrateo(btn: HTMLButtonElement) {
    const btn_txt = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._contribuyenteService.obtenerDepartamentoProrrateoArrayCuentas(
      this.acreedor_diverso.identificador_contribuyente, 5,
      this.acreedor_diverso.proveedor_identificador,
      this.lista_cuenta_seleccionada_prorrateo,
      this.acreedor_diverso.sucursal_identificador)
      .subscribe((data: any) => {
        console.log(data);
        this.lista_departamentos_prorrateo = data;
        btn.innerHTML = btn_txt;
        btn.disabled = false;
        $('#modal-deptos').modal('show');
      }, err => {
        btn.innerHTML = btn_txt;
        btn.disabled = false;
        Swal.fire('¡Error!', 'Error intentando obtener los departamentos.', 'error');
      });
  }

  // Llenar Catálogos
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
        console.log(data);
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
      Swal.fire('Error', 'No se pudieron obtener los impuestos. Por favor intente de nuevo.', 'error');
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
    console.log(this.acreedor_diverso);
    if (this.acreedor_diverso.identificador_contribuyente && this.acreedor_diverso.proveedor_identificador) {
      this._contribuyenteService.obtenerUsuarioCuentas_by(this.acreedor_diverso.identificador_contribuyente, 5, this.acreedor_diverso.proveedor_identificador).subscribe(
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
      this._contribuyenteService.obtenerUsuarioCuentas_byProrrateo(this.acreedor_diverso.identificador_contribuyente, 5, this.acreedor_diverso.proveedor_identificador).subscribe(
        (data: any) => {
          // const aux = data.map(obj => {
          //   obj.identificador = obj.identificador_cuenta + '|' + obj.deducible;
          //   obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta;
          //   return obj;
          // });
          this.lista_cuenta_prorrateo = this._globals.prepararSelect2(data, 'identificador_cuenta', 'cuenta');
          this.lista_cuenta_prorrateo = this._globals.agregarSeleccione(this.lista_cuenta_prorrateo, 'Selecciona...');
        }
        , (error) => {
          console.log(error);
        }
      );
    }
  }
  obtenerCatalogoImpuestos() {
    this._impuestoService.obtenerImpuestos(this.identificador_corporativo).subscribe((data: Array<Impuesto>) => {
      this.lista_impuesto = data;
    }, err => {
      console.log(err);
    })
  }

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
  guardar(button?: HTMLButtonElement) {
    const txt_btn = button ? button.innerHTML : '';
    if (button) {
      button.disabled = true;
      button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    }
    this._compartidoService.guardarAcreedorDiveroRD(this.identificador_header).subscribe((data: any) => {
      console.log(data);
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
      if (this.modalProrrateo) {
        this.modalProrrateo.actualizarBoton();
      }
      $('#modal-deptos').modal('hide');
      this.router.navigateByUrl('/home/acreedores_diversos');
      Swal.fire('¡Exito!', 'Cargado correctamente. Se envio a flujo de aprobación. ', 'success');
    }, err => {
      console.log(err.error);
      if (this.modalProrrateo) {
        this.modalProrrateo.actualizarBoton();
      }
      let mensaje = err.error.message ? err.error.message : '';
      if (err.error.length > 0) {
        mensaje = err.error[0].error.message;
      }
      if (button) {
        button.disabled = false;
        button.innerHTML = txt_btn;
      }
      Swal.fire('Error', mensaje, 'error');
    });
  }


}
