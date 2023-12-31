import { AprobacionRequest } from './../../../entidades/solicitud-anticipo-gastos-viaje';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { AcreedoresDiversosService } from './../../acreedores-diversos/acreedores-diversos.service';
import { FacturasProveedorService } from './../../facturas-proveedor/facturas-proveedor.service';
import { StorageService } from './../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { Component, Input, OnInit } from '@angular/core';
import {
  FiltroSolicitudes, DatosIniciales, CorporativoActivo
  , Usuario, FlujoAprobacion, AccionAprobar, ComplementoPago
} from 'src/app/entidades';
import { ListarCfdiService } from '../../listar-cfdi/listar-cfdi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-complemento-pago-rci',
  templateUrl: './list-complemento-pago-rci.component.html',
  styleUrls: ['./list-complemento-pago-rci.component.css']
})
export class ListComplementoPagoRciComponent implements OnInit {

  @Input() filtroConsulta: FiltroSolicitudes;
  @Input() mostrar_boton;
  lista_complemento_pago: ComplementoPago[] = [];
  private datos_iniciales: DatosIniciales;
  public detalle_complemento_pago: any; /* modificar la función ver detalle */
  //public detalle = new DetalleAcreedorDiverso();
  public dataTablesParameters: any;
  // filtro = new FiltroSolicitudes();
  public corporativo_activo: CorporativoActivo;
  public usuario: Usuario;
  public lista_detalle_aprobacion: FlujoAprobacion[];
  public complementoSeleccionada: ComplementoPago;/* verificar los cambios */
  dtOptions: DataTables.Settings = {};
  documentos_anexos = new Array<any>();
  public id_Doc: string;
  public folio_fiscal: string;
  public identificador_corporativo: string;

  url_api: string;
  url_api_aprobar: string;
  url_api_rechazar: string;
  detalles_factura;

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    public _facturasProveedorService: FacturasProveedorService,
    public _acreedoresService: AcreedoresDiversosService,
    private listarCFDiService: ListarCfdiService,
    private http: HttpClient,
    private router: Router,
    private compartidosService: CompartidosService,
  ) {

  }

  ngOnInit() {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.usuario = this.datos_iniciales.usuario;
    this.filtroConsulta = new FiltroSolicitudes();
    this.filtroConsulta.estatus = 1;
    this.url_api = `${this.globals.host_documentos}/gastos/list_proveedores`;
    // this.url_api = `http://qa-rci.factorecepcion.com/api/v1/validm/documento/gastos/list_proveedores`;
    this.url_api_aprobar = `${this.globals.host_documentos}/factura_proveedor/aprobar`;
    this.url_api_rechazar = `${this.globals.host_documentos}/factura_proveedor/rechazar`;
    this.iniciarTabla();
  }

  iniciarTabla() {
    const that = this;
    const dataFiltro = this.filtroConsulta;
    let headers = new HttpHeaders();
    const token = this.datos_iniciales.usuario.token;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.filtroConsulta.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    this.filtroConsulta.aprobador = this.datos_iniciales.usuario.aprobador;
    this.filtroConsulta.estatus = 1;
    headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      serverSide: true,
      processing: true,
      ordering: false,
      searching: false,
      language: {
        emptyTable: 'Ningún dato disponible en esta tabla',
        info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        infoPostFix: '',
        thousands: '',
        processing: 'Procesando',
        lengthMenu: 'Mostrar _MENU_',
        search: 'Buscar',
        zeroRecords: 'No se encontraron resultados',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        }
      }
      , ajax: (dataTablesParameters: any, callback) => {
        if (this.filtroConsulta.contributente_identificador && this.filtroConsulta.contributente_identificador !== '' && this.filtroConsulta.sucursal_identificador && this.filtroConsulta.sucursal_identificador !== '') {
          that.http
            .post<DataTablesResponse>(
              this.url_api,
              this.meterFiltros(dataTablesParameters), { headers }
            ).subscribe(resp => {
              // that.listaAnticipoGeneral = resp.data;
              that.lista_complemento_pago = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              // if (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '') {
              //   that.lista_acreedores_diversos = resp.data;
              //   callback({
              //     recordsTotal: resp.recordsTotal,
              //     recordsFiltered: resp.recordsFiltered,
              //     data: []
              //   });
              // } else {
              //   callback({
              //     recordsTotal: 0,
              //     recordsFiltered: 0,
              //     data: []
              //   });
              // }
            });
        } else {
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
        }

      }
    };
  }

  meterFiltros(obj: any = null, filtro = null) {
    if (filtro) {
      obj = {};
      obj.filt = filtro;
      this.filtroConsulta = filtro;
      this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.filtroConsulta.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
      this.filtroConsulta.aprobador = this.datos_iniciales.usuario.aprobador;
    }
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    // console.log(this.filtro_anticipo);
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    // console.log(obj);
    return obj;
  }

  actualizarTabla(filtro?) {
    if (filtro) {
      this.filtroConsulta = filtro;
    }
    this.filtroConsulta.aprobador = this.usuario.aprobador;
    this.filtroConsulta.tipo_movimiento = 9; /* .tipo_movimiento = 3; */
    $('#tabla_complemento_pagos').DataTable().ajax.reload();
  }

  enviarData(data: any) {
    this.filtroConsulta = data;
    this.actualizarTabla();
  }

  aprobar(id: any, id_documento: number) {
    const that = this;
    Swal.fire({
      title: '¿Realmente deseas aprobar esta solicitud?',
      input: 'text',
      type: 'info',
      text: '¡Esta acción no se puede revertir!    Debe introducir un mensaje de aprobación.',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200',
      },
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Aprobar!',
      cancelButtonText: 'Cerrar ventana',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        const aprobacion_request = new AprobacionRequest();
        aprobacion_request.id_solicitud = id;
        aprobacion_request.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        aprobacion_request.tipo_gasto = 9;/* aprobacion_request.tipo_gasto = 5; */
        aprobacion_request.comentario_aprobacion = mensaje;
        aprobacion_request.documento_id = id_documento;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // this._acreedoresService.aprobarAD(aprobacion).subscribe((data: any) => {
        //   console.log(data);
        // }, error => {
        //   console.log(error);
        // });
        aprobacion_request.comentario_aprobacion = mensaje
        return new Promise((resolve, reject) => {
          that.compartidosService.facturaProveedorAprobar(aprobacion_request).subscribe((data: any) => {
            resolve(data);
          }, error => {
            console.log(error.error);
            const mensaje = error.error.mensaje;
            Swal.fire('¡Error!', mensaje ? mensaje : 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
            reject(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.value && result.value.status !== 409) {
        Swal.fire(
          '¡Aprobada!',
          // 'Esta solicitud fue aprobada.',
          result.value.resp.mensaje,
          'success'
        );
        this.actualizarTabla();
      } else {
        if (result.value.status === 409) {
          console.log(result);
          Swal.fire(
            '¡Error!',
            result.value.error.mensaje,
            'warning'
          );
        }
      }
    });
  }

  rechazar(id: any, id_documento: number) {
    const that = this;
    Swal.fire({
      title: '¿Realmente deseas rechazar esta solicitud?',
      input: 'text',
      type: 'warning',
      text: '¡Esta acción no se puede revertir!    Debe introducir un comentario de rechazo.',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200',
      },
      inputValidator: (value) => {
        if (!value) {
          return '¡El comentario de rechazo es requerido!'
        }
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        const rechazo = new AprobacionRequest();
        rechazo.id_solicitud = id;
        rechazo.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        rechazo.tipo_gasto = 9; /* rechazo.tipo_gasto = 5; */
        rechazo.tipo_documento = 3;
        rechazo.documento_id = id_documento;
        rechazo.comentario = mensaje;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        return new Promise((resolve, reject) => {
          rechazo.comentario_rechazo = mensaje;
          that.compartidosService.facturaProveedorRechazar(rechazo).subscribe((data: any) => {
            const mensaje = 'Solicitud rechazada.';
            Swal.fire('Rechazado', mensaje, 'success');
            this.actualizarTabla();
            resolve(data);
          }, error => {
            Swal.fire('¡Error!', 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
            resolve(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        if (result.value.code === 200) {
          Swal.fire(
            'Éxito',
            `${result.value.mensaje}`,
            'success'
          );
        }
      }
    });
  }

  cargarNC(id_documento) { /* veificar camvios a complemento */
    /*   id_documento = this._storageService.encriptar_ids(String(id_documento));
      this.router.navigateByUrl('home/acreedores_diversos/carga_nc/' + id_documento); */
  }
  reprocesar(id) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['home', 'validacion', id]);
  }

  verDetallesAprobacion(btn, id: string) {
    /* console.log(btn); */
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.obtenerDetallesAprobacion(id, '9').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = 'Detalles';
      setTimeout(() => {
        $('#modal-detalles-aprobacion').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Detalles';
      Swal.fire('¡Alerta!', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
    });
  }

  verDetalles(btn: any, id: any, id_doc: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle_complemento_pago = data;
      btn.innerHTML = 'Ver';
      setTimeout(() => {
        $('#modal-detalle-complemento-pago').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Ver';
      if (!error.error.mensaje) {
        this.mostrarError();
      }
    });
    btn.innerHTML = 'Ver';
    this.mostrarAnexos(id_doc);
    this.id_Doc = id_doc;
  }

  mostrarAnexos(id_doc: string) {
    this.compartidosService.listarAnexos(id_doc).subscribe((data: any) => {
      this.documentos_anexos = data;
    });
    this.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
  }

  mostrarError() {
    Swal.fire('¡Alerta!', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
  }
  mostrarModalExito(msg: string) {
    Swal.fire('¡Éxito!', msg, 'success');
    this.actualizarTabla();
  }

  editaNotaCredito(complemento: ComplementoPago) { /* verificar el cambio a complemento */
    this.complementoSeleccionada = complemento;
    this.complementoSeleccionada.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    setTimeout(() => {
      $('#exampleModal').modal('show');
    }, 100);
  }

  mostrarModal(id: string, folio: string) {
    this.id_Doc = id;
    this.folio_fiscal = folio;
    this.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    setTimeout(() => {
      $('#id_modal').modal('show');
    }, 500);
  }
  mostrarInterprete(event: HTMLButtonElement, uuid: string) {
    $(event).removeClass('fa-eye');
    const txt_btn = event.innerHTML;
    event.disabled = true;
    event.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>'
    this.listarCFDiService.obtenerDetalleXML(uuid).subscribe((data: any) => {
      this.detalles_factura = data;
      setTimeout(() => {
        $('#modalVisorFactura').modal('show');
        event.innerHTML = txt_btn;
        $(event).addClass('fa-eye');
        event.disabled = false;
      }, 0);
    }, err => { $(event).addClass('fa-eye'); event.innerHTML = txt_btn; event.disabled = false; });

  }


}
