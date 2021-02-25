import { ListarCfdiService } from './../../listar-cfdi/listar-cfdi.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { FacturasProveedorService } from './../../facturas-proveedor/facturas-proveedor.service';
import { StorageService } from './../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { AcreedoresDiversosService } from './../../acreedores-diversos/acreedores-diversos.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FlujoAprobacion, NotasCredito, FiltroSolicitudes, DatosIniciales, CorporativoActivo, Usuario, AccionAprobar } from 'src/app/entidades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-notas-credito-rci',
  templateUrl: './list-notas-credito-rci.component.html',
  styleUrls: ['./list-notas-credito-rci.component.css']
})
export class ListNotasCreditoRciComponent implements OnInit {

  @Input() filtroConsulta: FiltroSolicitudes;
  @Input() mostrar_boton;
  lista_notas_credito: NotasCredito[] = [];
  private datos_iniciales: DatosIniciales;
  public detalle_notas_credito: any;
  //public detalle = new DetalleAcreedorDiverso();
  public dataTablesParameters: any;
  // filtro = new FiltroSolicitudes();
  public corporativo_activo: CorporativoActivo;
  public usuario: Usuario;
  public lista_detalle_aprobacion: FlujoAprobacion[];
  public notaSeleccionada: NotasCredito;
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
      serverSide: true,
      processing: true,
      scrollY: '45vh',
      scrollX: true,
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
              that.lista_notas_credito = resp.data;
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
    this.filtroConsulta.tipo_movimiento = 3;
    this.filtroConsulta.aprobador = this.usuario.aprobador;
    $('#tabla_acreedores_diversos').DataTable().ajax.reload();
  }

  enviarData(data: any) {
    this.filtroConsulta = data;
    this.actualizarTabla();
  }

  aprobar(id: any, id_documento: number) {
    Swal.fire({
      title: '¿Realmente deseas aprobar esta solicitud?',
      input: 'text',
      type: 'info',
      text: '¡Esta acción no se puede revertir!    Debe introducir un mensaje de aprobación',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '500',
      },
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Aprobar!',
      cancelButtonText: 'Cerrar ventana',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        const aprobacion = new AccionAprobar();
        aprobacion.id_solicitud = id;
        aprobacion.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        aprobacion.tipo_gasto = 9;/* aprobacion.tipo_gasto = 5; */
        aprobacion.comentario = mensaje;
        aprobacion.documento_id = id_documento;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // this._acreedoresService.aprobarAD(aprobacion).subscribe((data: any) => {
        //   console.log(data);
        // }, error => {
        //   console.log(error);
        // });
        return fetch(this.url_api_aprobar, {
          method: 'POST',
          body: JSON.stringify(aprobacion),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          return response.json();
        }).then(obj => {
          if (obj.code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.code === 500) {
            throw new Error(obj.mensaje);
          }
          Swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
          this.actualizarTabla(this.filtroConsulta);
        }).then((result) => {
          console.log(result);
        })
          .catch(error => {
            Swal.showValidationMessage(
              `${error} Para más detalles, verifique la validación.`
            );

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.value) {
        if (result.value === "autorizada") {
          Swal.fire(
            'Éxito',
            `${result.value}`,
            'success'
          );
        } else {
        }
      }
    });
  }

  rechazar(id: any, id_documento: number) {
    Swal.fire({
      title: '¿Realmente deseas rechazar esta solicitud?',
      input: 'text',
      type: 'warning',
      text: '¡Esta acción no se puede revertir!    Debe introducir un comentario de rechazo',
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
        const rechazo = new AccionAprobar();
        rechazo.id_solicitud = id;
        rechazo.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        rechazo.tipo_gasto = 9; /* rechazo.tipo_gasto = 5; */
        rechazo.documento_id = id_documento;
        rechazo.comentario = mensaje;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        return fetch(this.url_api_rechazar, {
          method: 'POST',
          body: JSON.stringify(rechazo),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          return response.json();
        }).catch(obj => {
          if (obj.code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.code === 500) {
            throw new Error(obj.mensaje);
          }
          Swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
          this.actualizarTabla();
        })
          .catch(error => {
            console.log(error);
            Swal.showValidationMessage(
              `Ocurrio un error inesperado: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value[0].mensaje) {
        Swal.fire(
          'Éxito',
          `${result.value[0].mensaje}`,
          'success'
        );
      }
    });
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
    console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    console.log(id);
    this._acreedoresService.obtenerDetallesAprobacion(id, '9').subscribe((data: any) => {
      console.log(data);
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
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle_notas_credito = data;
      btn.innerHTML = 'Ver';
      setTimeout(() => {
        $('#modal-detalle-notas-credito').modal('show');
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
    Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
  }
  mostrarModalExito(msg: string) {
    Swal.fire('Exito', msg, 'success');
    this.actualizarTabla();
  }

  editaNotaCredito(nota: NotasCredito) {
    this.notaSeleccionada = nota;
    this.notaSeleccionada.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
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
    const txt_btn = event.innerHTML;
    event.disabled = true;
    event.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>'
    this.listarCFDiService.obtenerDetalleXML(uuid).subscribe((data: any) => {
      this.detalles_factura = data;
      setTimeout(() => {
        $('#modalVisorFactura').modal('show');
        event.innerHTML = txt_btn;
        event.disabled = false;
      }, 0);
    }, err => { event.innerHTML = txt_btn; event.disabled = false; });

  }

}
