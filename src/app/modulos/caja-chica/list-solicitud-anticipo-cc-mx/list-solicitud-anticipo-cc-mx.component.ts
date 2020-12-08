import { Component, OnInit, Input } from '@angular/core';
import { CategoriaService } from '../../categoria/categoria.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { AnticipoGeneral } from 'src/app/entidades/anticipoGeneral';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { CajaChica } from 'src/app/entidades/caja-chica';
import { filter } from 'rxjs/operators';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-solicitud-anticipo-cc-mx',
  templateUrl: './list-solicitud-anticipo-cc-mx.component.html',
  styleUrls: ['./list-solicitud-anticipo-cc-mx.component.css']
})
export class ListSolicitudAnticipoCcMxComponent implements OnInit {
  @Input() filtro_anticipo;

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
      }
    ],
    oLanguage: {
      sProcessing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      sLengthMenu: 'Mostrar _MENU_',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Ningún dato disponible en esta tabla',
      sInfo:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: '',
      sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
      copy: 'Copiar',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior',
      },
      oAria: {
        sSortAscending:
          ': Activar para ordenar la columna de manera ascendente',
        sSortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  public listaSolicitudCC = new Array<CajaChica>();
  public showSolicitudCC = false;
  filtro = new FiltroSolicitudes();
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  public corporativo_activo: CorporativoActivo;

  constructor(
    private _servicio_categoria: CategoriaService,
    private router: Router,
    private _storageService: StorageService,
    public globals: GlobalsComponent,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.filtro.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    const usuario: any = this._storageService.loadSessionData();
    this.funcionSolicitudAnticipo();
  }

  obtenerData(data: any) {
    this.listaSolicitudCC = data;
  }

  EditarSolicitudCC(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/caja_chica/solicitudCC/edit/' + id]);
  }

  enviarData(filtro: any) {
    this.filtro = filtro;
    this.actualizarTabla();
  }

  funcionSolicitudAnticipo() {
    // console.log('entro');
    const that = this;
    const dataFiltro = this.filtro;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    // this.filtro.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
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
        processing: 'Procesando...',
        thousands: '',
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
        that.http
          .post<DataTablesResponse>(
            this.globals.host_documentos + '/solicitud/anticipo_caja_chica/list',
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            if (this.filtro.contributente_identificador) {
              that.listaSolicitudCC = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            }
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
      }
    };

  }

  actualizarTabla() {
    $('#tabla_solicitudCC').DataTable().ajax.reload();
  }

  meterFiltros(obj: any) {
    // obj.filt = this.filtro;
    obj.filt = this.filtro_anticipo;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    // console.log(obj);
    return obj;
  }

  ActualizaCorporativo(data) {
    const filt = new FiltroSolicitudes();
    filt.identificador_corporativo = data.value;
    this.filtro.identificador_corporativo = data.value;
    this.enviarData(filt);
  }

}
