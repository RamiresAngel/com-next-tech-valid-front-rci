import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GastosViajeService } from '../../gastos-viaje.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ComprobacionExtranjera, ComprobacionHeader, DatosIniciales } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ListaComprobantesComponent } from '../lista-comprobantes/lista-comprobantes.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

@Component({
  selector: 'app-form-comprobaciones-mx',
  templateUrl: './form-comprobaciones-mx.component.html',
  styleUrls: ['./form-comprobaciones-mx.component.css']
})
export class FormComprobacionesMxComponent implements OnInit {
  @ViewChild('select_tipo_comprobante') select_tipo_comprobante: any;
  @ViewChild('lista_comprobantes') lista_comprobantes: ListaComprobantesComponent;
  formulario_comprobacion: FormGroup;
  numero_viaje: string;
  numero_viaje_valido: boolean;
  tipo_comprobante: 'nacional' | 'internacional' | '';
  public solicitud: any;
  public id_solicitud: number = 0;
  public total_comprobado: number = 0;
  public lista_cuentas = [];
  lista_comprobaciones = [];
  comprobacion = new ComprobacionExtranjera();
  array_comprobaciones = new Array<ComprobacionHeader>();
  nueva_comprobacion = new ComprobacionHeader();
  fecha_comprobante: string;
  tipo_cambio = 1;
  show_loading = false;
  lista_monedas = [];

  datos_iniciales: DatosIniciales;
  constructor(
    private formBuilder: FormBuilder,
    private _gastoViajeService: GastosViajeService,
    private router: Router,
    private _compartidoService: CompartidosService,
    private globals: GlobalsComponent,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.formulario_comprobacion = this.formBuilder.group([
    ]);
    this.obtenerMonedas();
  }

  iniciarComoprobacion() {
    this.nueva_comprobacion = new ComprobacionHeader();
  }

  obtenerCuentas() {
    this._gastoViajeService.getCuentasContribuyenteSucursal(this.solicitud.contributente_identificador, this.solicitud.sucursal_identificador, this.solicitud.identificador_departamento).
      subscribe((data: any) => {
        this.lista_cuentas = data;
        this.lista_cuentas = this.globals.agregarSeleccione(this.globals.prepararSelect2(this.lista_cuentas, 'cuenta_codigo', 'cuenta', '', false), 'Seleccione concepto...');
      }, error => console.log(error)
      );
  }

  obtenerMonedas() {
    this._compartidoService.obtenerMonedasCorporativo(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_monedas = this.globals.prepararSelect2(data, 'clave', 'nombre');
      this.lista_monedas = this.globals.agregarSeleccione(this.lista_monedas, 'Seleccione moneda...');
    });
  }

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

  setTipoCambio(tipo_cambio: number) {
    this.tipo_cambio = tipo_cambio;
  }

  getValor(input) {
    input.value = input.value.trim()
    this.numero_viaje = input.value;
  }
  onTipoComprobanteSelect(tipo_comprobante) {
    this.tipo_comprobante = tipo_comprobante.value;
    this.iniciarComoprobacion();
  }

  enviarConceptos(datos: any) {
    this.select_tipo_comprobante.nativeElement.selectedIndex = 0;
    this.tipo_comprobante = null;
    if (!datos.extranjero) {
      this.lista_comprobaciones.push(datos);
      this.agregarComprobacion();
    } else {
      this.lista_comprobaciones.push(datos.data);
      this.agregarComprobacion(datos.header);
    }
    this.calcularComprobado();
  }
  actualizarFecha(data: any) {
    this.fecha_comprobante = data;
  }

  calcularComprobado() {
    this.lista_comprobantes.calcularComprobado();
    // let suma = 0;
    // this.total_comprobado = 0;
    // this.lista_comprobaciones.forEach(x => {
    //   x.forEach(y => {
    //     suma += y.importe;
    //   })
    // });
    // this.total_comprobado = suma;
  }

  cancelar() {
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
        this.router.navigateByUrl('/home/gastos_viaje/comprobacion');
      }
    })

  }
  cancelarCarga() {
    this.tipo_comprobante = '';
    this.select_tipo_comprobante.nativeElement.selectedIndex = 0;
  }

  agregarComprobacion(datos?: any) {
    if (!datos) {
      this.nueva_comprobacion.id_moneda = this.solicitud.id_moneda;
      this.nueva_comprobacion.descripcion = this.solicitud.descripcion;
      this.nueva_comprobacion.tipo_documento_id = 6;
      this.nueva_comprobacion.id_tipo_gasto = 1;
    } else {
      this.nueva_comprobacion = datos;
    }
    this.nueva_comprobacion.id_solicitud = this.solicitud.id;
    this.nueva_comprobacion.identificador_contribuyente = this.solicitud.contributente_identificador;
    this.nueva_comprobacion.identificador_corporativo = this.solicitud.identificador_corporativo;
    this.nueva_comprobacion.identificador_departamento = this.solicitud.identificador_departamento;
    this.nueva_comprobacion.identificador_usuario = this.solicitud.usuario_identificador;
    this.nueva_comprobacion.identificador_sucursal = this.solicitud.sucursal_identificador
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
    const com = { ...this.nueva_comprobacion, index: this.array_comprobaciones.length, lista_negra: this.datos_iniciales.usuario.lista_negra };
    this.array_comprobaciones.push(com);
  }

  comprobar(boton) {
    this.show_loading = true;
    const texto = boton.innerHTML;
    boton.innerHTML = 'enviando';
    boton.disabled = true;

    this._gastoViajeService.agregarComprobaciones(this.array_comprobaciones).subscribe((data: any) => {
      boton.innerHTML = texto;
      boton.disabled = false;
      if (data.length !== 0) {
        data.forEach(element => {
          if (element.error_code && element.error_code === 400) {
            Swal.fire({
              title: `Error con el ${element.index + 1} documento.`,
              text: element.mensaje ? element.mensaje : 'Error en la validación del documento.',
              type: 'error',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ver Validación',
              cancelButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(element.documento_cfdi_id))]);
              } else {
                this.router.navigate(['home', 'gastos_viaje', 'comprobacion']);
              }
            });
          }
          if (element.error_code && element.error_code === 409) {
            Swal.fire('Error: ', element.mensaje ? element.mensaje : 'Algo salio mal. Inténtalo nuevamente mas tarde ', 'error');
          }
          if (element.error_code !== null && element.error_code === 0) {
            this.router.navigate(['home', 'gastos_viaje', 'comprobacion']);
            Swal.fire('Exito ', 'Comprobación agregada correctamente.', 'success');
          }
        });
      }
      this.show_loading = false;
    }, error => {
      this.show_loading = false;
      boton.innerHTML = texto;
      boton.disabled = false;
      console.log(error);
      if (error.error.length !== 0) {
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

  setArchivo(archivo) {
    this.nueva_comprobacion.xml = archivo;
    this.nueva_comprobacion.file = archivo;
  }

  enviarDatos(data) {
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
  eliminarComprobacion(indice) {
    this.array_comprobaciones.splice(indice, 1);
    let index = 0;
    this.array_comprobaciones.forEach(x => {
      x.index = index;
      index++;
    });
  }

  public get controles() { return this.formulario_comprobacion.controls; }
}
