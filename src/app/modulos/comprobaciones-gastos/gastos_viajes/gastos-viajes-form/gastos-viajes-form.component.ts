import { TipoGastoService } from './../../../tipo-gasto/tipo-gasto.service';
import { CentroCostosService } from './../../../centro-costos/centro-costos.service';
import { Usuario } from 'src/app/entidades/index';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ComprobacionHeader } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { ComprobacionesGastosService } from '../../comprobaciones-gastos.service';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { DefaultCFDI } from 'src/app/entidades/cfdi';

@Component({
  selector: 'app-gastos-viajes-form',
  templateUrl: './gastos-viajes-form.component.html',
  styleUrls: ['./gastos-viajes-form.component.css']
})
export class GastosViajesFormComponent {
  @ViewChild('select_tipo_comprobante') select_tipo_comprobante: any;

  numero_comprobacion: number;
  totales = { total_gastado: 0, monto_reembolsable: 0 }
  lista_comprobantes = new Array<any>();

  formulario_comprobacion: FormGroup;
  numero_viaje: string;
  numero_viaje_valido: boolean;
  tipo_comprobante: 'nacional' | 'internacional' | '' = '';
  public solicitud: any;
  public id_solicitud: number = 0;
  public total_comprobado: number = 0;
  public lista_cuentas = [];
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

  usuario: Usuario;
  constructor(
    private formBuilder: FormBuilder,
    private _gastoViajeService: GastosViajeService,
    private router: Router,
    private _compartidoService: CompartidosService,
    private _tipoGastoService: TipoGastoService,
    private _centroCostosService: CentroCostosService,
    private _comprobacionService: ComprobacionesGastosService,
    private globals: GlobalsComponent,
    private _storageService: StorageService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.formulario_comprobacion = this.formBuilder.group([
    ]);
    this.nueva_comprobacion = new ComprobacionHeader();
    this.obtenerCatalogos();
    this.iniciarComoprobacion();
  }

  guardarFormHeader(formularioHeader) {
    this.loadingService.showLoading();
    this.comprobacion_header.identificador_usuario = this.usuario.identificador_usuario;
    this.comprobacion_header.tipo_gasto = 1;
    this.comprobacion_header.id_moneda = Number(this.comprobacion_header.id_moneda);
    this.comprobacion_header.recuperable = this.comprobacion_header.recuperable ? 1 : 0;
    this._comprobacionService.guardarHeaderComprobacion(this.comprobacion_header).subscribe((data: any) => {
      this.numero_comprobacion = data.data.folio_comprobacion;
      this.loadingService.hideLoading();
    }, err => {
      this.loadingService.hideLoading();
    });
  }

  iniciarComoprobacion() {
    this.comprobacion_header = new ComprobacionGastosHeader();
    this.comprobacion_header.usuario = this.usuario.nombre;
  }

  //#region  Obtencion de Catalogos
  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.obtenerCuentas();
    this.obtenerMonedas();
    this.obtenerAprobadores();
  }
  obtenerAprobadores() {
    this._compartidoService.obtenerJefeInmediato(this.usuario.identificador_usuario).subscribe((data: any) => {
      this.comprobacion_header.aprobador = data.data.nombre
      this.comprobacion_header.identificador_aprobador = data.data.identificador_usuario
    });
  }
  obtenerCuentas() {
    this._tipoGastoService.getlistCuentaAgrupacion('1', this.usuario.identificador_corporativo).subscribe((data: any) => {
      console.log(data);
      this.lista_cuentas = this.globals.prepararSelect2(data, 'id', 'nombre');
      this.lista_cuentas = this.globals.agregarSeleccione(this.lista_cuentas, 'Seleccione concepto...');
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
    this._compartidoService.obtenerMonedasCorporativo(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_monedas = this.globals.prepararSelect2(data, 'id', 'nombre');
      this.lista_monedas = this.globals.agregarSeleccione(this.lista_monedas, 'Seleccione moneda...');
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
        Swal.fire('Error', error.error.mensaje, 'error');
      } else {
        Swal.fire('Error', 'Algo salio mal, por favor inténtelo de nuevo mas tarde.', 'error');
      }
    });
  }

  agregarComprobante(comprobante: DefaultCFDI) {
    comprobante.identificador_corporativo = this.usuario.identificador_corporativo;
    comprobante.identificador_contribuyente = this.comprobacion_header.identificador_compania;
    comprobante.identificador_usuario = this.usuario.identificador_usuario;
    comprobante.numero_comprobante = String(this.numero_comprobacion);
    comprobante.folio_comprobacion = this.numero_comprobacion;
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
            this.router.navigateByUrl('/home/comprobaciones/gastos_viaje');
          }
        });
      } else if (data.error_code && data.error_code === 409) {
        Swal.fire('Error: ', data.mensaje ? data.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
      } else if (data.error_code == 200 || (data.error_code !== null && data.error_code === 0)) {
        // this.router.navigateByUrl('/home/comprobaciones/gastos_viaje');
        this.totales.monto_reembolsable = data.monto;
        this.lista_comprobantes.push(comprobante);
        comprobante = null;
        this.tipo_comprobante = '';
        Swal.fire('Exito ', data.mensaje ? data.mensaje : 'Comprobación agregada correctamente.', 'success');
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
    this.router.navigateByUrl('/home/comprobaciones/gastos_viaje')
  }
  cancelarCarga() {
    this.tipo_comprobante = '';
  }

  eliminarComprobacion() {
    Swal.fire({
      title: '',
      text: "¿Estas seguro de cancelar la comprobación?, ningún dato se  almacenará.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cancelar'

    }).then((result) => {
      if (result.value) {
        if (this.numero_comprobacion) {
          this._comprobacionService.eliminarComprobacion(this.numero_comprobacion).subscribe((data) => {
          });
        }
        this.router.navigateByUrl('/home/comprobaciones/gastos_viaje')
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

  comprobar() {
    const obj = {
      folio_comprobacion: this.numero_comprobacion,
      tipo_movimiento: 5
    }
    this._gastoViajeService.finalizarComprobacion(obj).subscribe((data: any) => {
      console.log(data);
      Swal.fire('Éxito ', data.mensaje ? data.mensaje : 'Comprobación enviada a flujo de aprobación correctamente. ', 'success');
      this.router.navigateByUrl('/home/comprobaciones/gastos_viaje');

    }, err => {
      console.log(err);
      Swal.fire('Error: ', err.error.mensaje ? err.error.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
    });
    // Logica para finalizar comprobacion
    // this.show_loading = true;
    // this._gastoViajeService.agregarComprobaciones(comprobacion).subscribe((data: any) => {
    //   // data.forEach(element => {
    //   if (data.error_code && data.error_code === 400) {
    //     Swal.fire({
    //       title: `Error con el ${data.index + 1} documento.`,
    //       text: data.mensaje ? data.mensaje : 'Error en la validación del documento.',
    //       type: 'error',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#3085d6',
    //       confirmButtonText: 'Ver Validación',
    //       cancelButtonText: 'Aceptar'
    //     }).then((result) => {
    //       if (result.value) {
    //         this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
    //       } else {
    //         this.router.navigateByUrl('/home/comprobaciones/gastos_viaje');
    //       }
    //     });
    //   } else if (data.error_code && data.error_code === 409) {
    //     Swal.fire('Error: ', data.mensaje ? data.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
    //   } else if (data.error_code == 200 || (data.error_code !== null && data.error_code === 0)) {
    //     this.router.navigateByUrl('/home/comprobaciones/gastos_viaje');
    //     Swal.fire('Exito ', data.mensaje ? data.mensaje : 'Comprobación agregada correctamente.', 'success');
    //   }
    //   // });
    //   this.show_loading = false;
    // }, error => {
    //   this.show_loading = false;
    //   console.log(error);
    //   if (Array.isArray(error.error)) {
    //     error.error.forEach(element => {
    //       if (element.error_code && element.error_code === 409) {
    //         Swal.fire(`Error con el ${element.index + 1} documento`, element.mensaje ? element.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
    //       }
    //     });
    //   } else {
    //     if (error.error) {
    //       const err = error.error.mensaje;
    //       Swal.fire(`Error`, err ? err : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
    //     }

    //   }
    // });
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
  eliminarComprobante(indice) {
    this.array_comprobaciones.splice(indice, 1);
    let index = 0;
    this.array_comprobaciones.forEach(x => {
      x.index = index;
      index++;
    });
  }

  public get controles() { return this.formulario_comprobacion.controls; }
}
