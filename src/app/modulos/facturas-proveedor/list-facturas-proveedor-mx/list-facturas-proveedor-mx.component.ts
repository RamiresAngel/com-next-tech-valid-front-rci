import { ListarCfdiService } from './../../listar-cfdi/listar-cfdi.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GastosViajeService } from './../../gastos-viaje/gastos-viaje.service';
import { AprobacionRequest } from './../../../entidades/solicitud-anticipo-gastos-viaje';
import { AcreedoresDiversosService } from './../../acreedores-diversos/acreedores-diversos.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales, Usuario, FiltroSolicitudes, CorporativoActivo, FlujoAprobacion } from 'src/app/entidades';
import { FacturasProveedorService } from '../facturas-proveedor.service';
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
  selector: 'app-list-facturas-proveedor-mx',
  templateUrl: './list-facturas-proveedor-mx.component.html',
  styleUrls: ['./list-facturas-proveedor-mx.component.css']
})
export class ListFacturasProveedorMxComponent implements OnInit {

  @Input() filtroConsulta: FiltroSolicitudes;
  @Input() mostrar_boton;
  lista_facturas_proveedor: any[] = [];
  detalles_factura;
  private datos_iniciales: DatosIniciales;
  public detalle_factura_proveedor: any;
  //public detalle = new DetalleAcreedorDiverso();
  public dataTablesParameters: any;
  // filtro = new FiltroSolicitudes();
  public corporativo_activo: CorporativoActivo;
  public usuario: Usuario;
  public lista_detalle_aprobacion: FlujoAprobacion[];
  dtOptions: DataTables.Settings = {};
  documentos_anexos = new Array<any>();
  public id_Doc: string;
  public folio_fiscal: string;
  public identificador_corporativo: string;

  url_api: string;
  url_api_aprobar: string;
  url_api_rechazar: string;


  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    public _compartidosService: CompartidosService,
    private listarCFDIService: ListarCfdiService,
    public _facturasProveedorService: FacturasProveedorService,
    public _gastoViajeService: GastosViajeService,
    public _acreedoresService: AcreedoresDiversosService,
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
    this.url_api_aprobar = `${this.globals.host_documentos}/gastos/factura_proveedor/aprobar`;
    this.url_api_rechazar = `${this.globals.host_documentos}/gastos/factura_proveedor/rechazar`;
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
              that.lista_facturas_proveedor = resp.data;
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
    this.filtroConsulta.tipo_movimiento = 1;
    $('#tabla_acreedores_diversos').DataTable().ajax.reload();
  }

  enviarData(data: any) {
    this.filtroConsulta = data;
    console.log(data);
    this.actualizarTabla();
  }

  // verDetalles(btn: any, id: any) {
  //   console.log(btn);
  //   btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
  //   console.log(id);
  //   this._facturasProveedorService.verDetallesAcreedores(id).subscribe((data: any) => {
  //     console.log(data);
  //     this.detalle = data;
  //     btn.innerHTML = 'Ver';
  //     $('#modal-detalles-comp').modal('show');
  //   }, error => {
  //     btn.innerHTML = 'Ver';
  //     if (error.error.mensaje) {
  //     } else {
  //       Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
  //     }
  //   });
  // }
  aprobar(button, id: any, documento_id: number, documento) {
    let agrupar = false;
    const aprobacion_request = new AprobacionRequest();
    const that = this;
    $(document).on('click', "#agrupar_conceptos", function (event) {
      console.log(event.target.checked);
      agrupar = event.target.checked;
      console.log(' texto agrupado ', agrupar);
      aprobacion_request.agrupar = agrupar;
    });
    aprobacion_request.tipo_gasto = 9;
    aprobacion_request.id_solicitud = id;
    aprobacion_request.comentario_rechazo = '';
    aprobacion_request.documento_id = documento_id;
    aprobacion_request.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
    button.innerHTML = '';
    button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>';
    // this._gastoViajeService.getPendientesComprobar(id).subscribe((data: any) => {
    // if (data.length > 1) {
    Swal.fire({
      title: '¿Realmente deseas aprobar esta solicitud?',
      input: 'text',
      type: 'info',
      html: `
      <p class='mt-2'> ¡Esta acción no se puede revertir!    Debe introducir un comentario de aceptación  </p>
      ${documento.numero_nivel == 1 ?
          `<div class="col-md-6">
          <div style="padding:0px 15px 15px 15px !important" class="switcher p-t-10">
            <input type="checkbox" id="agrupar_conceptos" class="ml-5" name="agrupar_conceptos">
            <label for="agrupar_conceptos" style="width: auto; margin-left: -15px;"> Agrupar conceptos </label>
          </div>
        </div>`
          : ''}
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '500',
      },
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        aprobacion_request.comentario_aprobacion = mensaje
        return new Promise((resolve, reject) => {
          that._compartidosService.facturaProveedorAprobar(aprobacion_request).subscribe((data: any) => {
            resolve(data);
          }, error => {
            console.log(error.error);
            const mensaje = error.error.mensaje;
            Swal.fire('Error', mensaje ? mensaje : 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
            reject(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
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
    })
    // } else {
    //   Swal.fire({
    //     title: 'Alerta',
    //     text: `Esta apunto de aprobar esta solicitud. ¿Desea continuar?`,
    //     type: 'warning',
    //     showCancelButton: true,
    //     cancelButtonText: 'Cancelar',
    //     confirmButtonText: 'Continuar',
    //   }).then((result) => {
    //     if (result.value) {
    //       this._gastoViajeService.aprobarSolicitud(aprobacion_request).subscribe((data: any) => {
    //         console.log(data);
    //         Swal.fire(
    //           '¡Aprobada!',
    //           data.resp.mensaje ? data.resp.mensaje : 'Esta solicitud fue aprobada.',
    //           'success'
    //         );
    //         this.actualizarTabla();
    //       }, error => {
    //         Swal.fire('Error', 'Algo salio mal, por favor inténtelo de nuevo mas tarde.', 'error');
    //       });
    //     }
    //   })
    // }
    button.innerHTML = '<i class="far fa-check-circle"></i>';
    // }, error => {
    //   button.innerHTML = '<i class="far fa-check-circle"></i>';
    //   console.log(error);
    // });
  }

  rechazar(id: any, nivel_flujo_aprobacion: number) {
    const that = this;
    let reiniciar_flujo = 0;
    const mostrar_switch = nivel_flujo_aprobacion > 1 ? true : false;
    const aprobacion_request = new AprobacionRequest();
    aprobacion_request.id_solicitud = id;
    aprobacion_request.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
    aprobacion_request.tipo_gasto = 9;
    Swal.fire({
      title: '¿Realmente deseas rechazar esta solicitud?',
      input: 'text',
      type: 'warning',
      html:
        mostrar_switch ? `
        <div class ="d-flex">
        <div style="padding:0px 15px 15px 15px !important" class="switcher p-t-10">
        <input type="checkbox" id="reiniciar_flujos" class="ml-5" name="reiniciar_flujos">
        <label for="reiniciar_flujos" style="width: auto; margin-left: -15px;"> </label>
      </div>
        Rechazar/Reiniciar Flujo
        </div>
      ¡Esta acción no se puede revertir!    Debe introducir un comentario de rechazo. ` :
          `¡Esta acción no se puede revertir!    Debe introducir un comentario de rechazo. `,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '500',
      },
      inputValidator: (value) => {
        if (!value) {
          return '¡El comentario de rechazo es requerido!'
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        return new Promise((resolve, reject) => {
          aprobacion_request.comentario_rechazo = mensaje;
          that._compartidosService.facturaProveedorRechazar(aprobacion_request).subscribe((data: any) => {
            const mensaje = 'Solicitud rechazada.';
            Swal.fire('Rechazado', mensaje, 'success');
            this.actualizarTabla();
            resolve(data);
          }, error => {
            Swal.fire('Error', 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
            resolve(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      // console.log(result);
      if (result.value) {
        if (result.value[0].estatus === '1') {
          Swal.fire(
            'Éxito',
            `${result.value[0].mensaje}`,
            'success'
          );
        } else {
          console.log(result.value[0].mensaje);
        }
      }
    });
    document.getElementById('reiniciar_flujos').addEventListener('click', (e: any) => { console.log(e.target.checked) });
  }
  cargarNC(id_documento) {
    id_documento = this._storageService.encriptar_ids(String(id_documento));
    this.router.navigateByUrl('home/acreedores_diversos/carga_nc/' + id_documento);
  }
  reprocesar(id) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['home', 'validacion', id]);
  }

  verDetallesAprobacion(btn, id: string) {
    // console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    // console.log(id);
    this._acreedoresService.obtenerDetallesAprobacion(id, '9').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = 'Detalles';
      setTimeout(() => {
        $('#modal-detalles-aprobacion').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Detalles';
      Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
    });
  }

  verDetalles(btn: any, id: any, id_doc: any) {
    // console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    // console.log(id);
    this._acreedoresService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle_factura_proveedor = data;
      btn.innerHTML = 'Ver';
      setTimeout(() => {
        $('#modal-detalle-factura-proveedor').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Ver';
      if (!error.error.mensaje) {
        this.mostrarError();
      }
    });
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
    Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
  }
  mostrarModalExito(msg: string) {
    Swal.fire('Exito', msg, 'success');
    this.actualizarTabla();
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
    this.listarCFDIService.obtenerDetalleXML(uuid).subscribe((data: any) => {
      this.detalles_factura = data;
      setTimeout(() => {
        $('#modalVisorFactura').modal('show');
        event.innerHTML = txt_btn;
        $(event).addClass('fa-eye');
        event.disabled = false;
      }, 0);
    }, err => { $(event).addClass('fa-eye'); event.innerHTML = txt_btn; event.disabled = false; });

  }
  onCerrarModalDetalle() {
    this.actualizarTabla();
  }

}
