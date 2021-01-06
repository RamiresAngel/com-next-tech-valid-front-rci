import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales, Usuario, FiltroSolicitudes, CorporativoActivo, FlujoAprobacion, AccionAprobar } from 'src/app/entidades';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AcreedoresDiversosService } from '../../acreedores-diversos/acreedores-diversos.service';

declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-list-facturas-proveedor-rd',
  templateUrl: './list-facturas-proveedor-rd.component.html',
  styleUrls: ['./list-facturas-proveedor-rd.component.css']
})
export class ListFacturasProveedorRdComponent implements OnChanges {

  @Input() filtro_tabla: FiltroSolicitudes;
  @Input() mostrar_boton;
  lista_facturas_proveedor: any[] = [];
  private datos_iniciales: DatosIniciales;
  private id_tipo_gasto = 9;
  public detalle_factura_proveedor: any;
  public dataTablesParameters: any;
  // filtro = new FiltroSolicitudes();
  public corporativo_activo: CorporativoActivo;
  public usuario: Usuario;
  public lista_detalle_aprobacion: FlujoAprobacion[];
  public filtroConsulta = new FiltroSolicitudes();
  dtOptions: DataTables.Settings = {};

  url_api: string;
  url_api_aprobar: string;
  url_api_rechazar: string;

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _acreedorDiversoService: AcreedoresDiversosService,
    private http: HttpClient,
    private router: Router
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.usuario = this.datos_iniciales.usuario;
    this.filtroConsulta.estatus = 1;
    this.url_api = `${this.globals.host_documentos}/gastos/list_proveedores`;
    this.url_api_aprobar = `${this.globals.host_documentos}/gastos/factura_proveedor/aprobar`;
    this.url_api_rechazar = `${this.globals.host_documentos}/gastos/factura_proveedor/rechazar`;
    this.iniciarTabla();
  }

  ngOnChanges() {
    if (this.filtro_tabla) {
      this.filtroConsulta = { ...this.filtro_tabla };
    }
  }

  iniciarTabla() {
    const that = this;
    // const dataFiltro = this.filtroConsulta;
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
              that.lista_facturas_proveedor = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
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
      this.filtroConsulta.start = 1;
      this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.filtroConsulta.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
      this.filtroConsulta.aprobador = this.datos_iniciales.usuario.aprobador;
      this.filtroConsulta.listtype = 'list';
    }
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.start = 1;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  actualizarTabla(filtro?) {
    console.log(filtro);

    if (filtro) {
      this.filtroConsulta = filtro;
    }
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
      type: 'info',
      // text: '¡Esta acción no se puede revertir!',
      html: `               <div class="col-md-3">
      <div style="padding:0px 15px 15px 15px !important" class="switcher p-t-10">
        <input type="checkbox" id="nota_credito" class="ml-5" name="nota_credito">
        <label for="nota_credito" style="width: auto; margin-left: -15px;"> Aplica prorrateo </label>
      </div>
    </div> `,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Aprobar!',
      cancelButtonText: 'Cerrar ventana',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const aprobacion = new AccionAprobar();
        aprobacion.id_solicitud = id;
        aprobacion.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        aprobacion.tipo_gasto = this.id_tipo_gasto;
        aprobacion.documento_id = id_documento;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
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
          if (obj.error_code === 409 || obj.code === 409) {
            throw new Error(obj.mensaje);
          }
          else if (obj.error_code === 500 || obj.code === 500) {
            throw new Error(obj.mensaje);
          }
          else if (obj.sap_response && obj.sap_response.type == 'S') {
            // Cuando fue aprobado
            return obj.sap_response;
          }
          else if (obj.resp) {
            return obj.resp.mensaje;
          }
        }).then((result) => {
          if (result.message) {
            return result.message;
          }
          if (result) {
            return result;
          }
        })
          .catch(error => {
            Swal.showValidationMessage(
              `${error} Para más detalles, verifique la validación.`
            );

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.mostrarModalExito(result.value);
      }
    });
  }

  rechazar(id: number, id_documento: number) {
    Swal.fire({
      title: 'Debe introducir un comentario de rechazo',
      input: 'text',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        const rechazo = new AccionAprobar();
        rechazo.id_solicitud = id;
        rechazo.documento_id = id_documento;
        rechazo.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        rechazo.tipo_gasto = this.id_tipo_gasto;
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
          if (obj.error_code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500) {
            throw new Error(obj.mensaje);
          }
          Swal.fire(
            'Éxito',
            'Rechazado correctamente',
            'success'
          );
          this.actualizarTabla(this.filtroConsulta);
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
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedorDiversoService.obtenerDetallesAprobacion(id, '9').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = 'Detalles';
      setTimeout(() => {
        $('#modal-detalles-aprobacion').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Detalles';
      if (!error.error.mensaje) {
        this.mostrarError();
      }
    });
  }

  verDetalles(btn: any, id: any) {
    console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    console.log(id);
    this._acreedorDiversoService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle_factura_proveedor = data;
      btn.innerHTML = 'Ver';
      $('#modal-detalle-factura-proveedor').modal('show');
    }, error => {
      btn.innerHTML = 'Ver';
      if (!error.error.mensaje) {
        this.mostrarError();
      }
    });
  }

  mostrarError() {
    Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
  }
  mostrarModalExito(msg: string) {
    Swal.fire('Exito', msg, 'success');
    this.actualizarTabla();
  }

}
