import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales, OrdenCompra, CodigoRecepcion } from 'src/app/entidades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargaDocumentosService } from '../../carga-documentos/carga-documentos.service';
import Swal from 'sweetalert2';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-orden-compra-mx',
  templateUrl: './list-orden-compra-mx.component.html',
  styleUrls: ['./list-orden-compra-mx.component.css']
})
export class ListOrdenCompraMxComponent implements OnInit {

  private identificador_corporativo: string;
  private corporativo_activo: CorporativoActivo;
  public lista_ordenes_compra = new Array<OrdenCompra>();
  @Input() filtroConsulta;
  public datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  public url = '';
  public txtDetalle = 'Detalle';
  public txtDocsRel = 'Ver';
  public documento = {
    codigos_recepcion: new CodigoRecepcion(),
    orden_compra: new OrdenCompra()
  };

  constructor(
    public globals: GlobalsComponent,
    private _cargaDocumentosService: CargaDocumentosService,
    private _storage_service: StorageService,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storage_service.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.url = `${globals.host_documentos}/orden_compra/list`;
  }

  ngOnInit() {
    this.actualizaTabla();
  }

  actualizaTabla() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    const token = this.datos_iniciales.usuario.token;
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
        processing: 'Buscando...',
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
        if (this.filtroConsulta.identificador_contribuyente && this.filtroConsulta.identificador_contribuyente !== '' &&
          this.filtroConsulta.sucursal_identificador && this.filtroConsulta.sucursal_identificador !== '') {
          that.http
            .post<DataTablesResponse>(
              this.url,
              this.meterFiltros(dataTablesParameters), { headers }
            ).subscribe(resp => {
              that.lista_ordenes_compra = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });

            });
        } else {
          that.lista_ordenes_compra = [];
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
        }
      }
    };
  }

  meterFiltros(obj: any) {
    this.filtroConsulta.listtype = 'list';
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    obj.order = [{
      dir: 'asc'
    }];
    obj.search = {
      value: ''
    };
    return obj;
  }

  actualizarTabla() {
    if ($('#tabla_ordenes_compra')) {
      $('#tabla_ordenes_compra').DataTable().ajax.reload();
    }
  }

  /**
   * Actualiza el identificador Corporativo, esta funcion sólo de puede
   * ejecutar cuando se accede con un usuario administrador Next
   * @param obj Contiene la informacion del corporativo activo seleccionado.
   */
  ActualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    // this.obtenerProveedoresCorporativo(this.identificador_corporativo);
  }
  mostrarDetalles(btn, orden_compra) {
    btn.target.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._cargaDocumentosService.validarOrdenCompraMX(orden_compra, this.corporativo_activo.corporativo_identificador).subscribe(
      (data: any) => {
        this.documento = data;

        $('#modal-oc').modal('toggle');
        btn.target.innerHTML = 'Detalle';
      }, error => {
        if (error.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: error.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor intentalo nuevamente más tarde'
          });
        }
        btn.target.innerHTML = 'Detalle';
      },
      () => {
      }
    );
  }
  mostrarDocsRelacioandos(btn, orden_compra) {
    btn.target.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._cargaDocumentosService.validarOrdenCompraMX(orden_compra, this.corporativo_activo.corporativo_identificador).subscribe(
      (data: any) => {
        this.documento = data;
        $('#modal-docs-rel').modal('toggle');
        btn.target.innerHTML = 'Ver';
      }, error => {
        if (error.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: error.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor intentalo nuevamente más tarde'
          });
        }
        btn.target.innerHTML = 'Ver';
      },
      () => {
      }
    );
  }
}
