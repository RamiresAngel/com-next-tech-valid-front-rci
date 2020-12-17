import { Component, OnInit, Input } from '@angular/core';
import { Cfdi } from 'src/app/entidades/cfdi';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorporativoActivo, DatosIniciales, FiltroCFDI, Comprobacion } from 'src/app/entidades';
import { ComprobacionesGeneralService } from '../comprobaciones-general.service';
import { DetallesComprobacion } from 'src/app/entidades/comprobacion';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-comprobaciones-general-mx',
  templateUrl: './list-comprobaciones-general-mx.component.html',
  styleUrls: ['./list-comprobaciones-general-mx.component.css']
})
export class ListComprobacionesGeneralMxComponent implements OnInit {

  public detalles = new DetallesComprobacion();
  // public array_sucursales: any;
  public lista_comprobaciones: Array<Comprobacion>;
  public showCorporativos = false;
  public identificador_corporativo = '';
  // filtro_anticipo = new FiltroCFDI();
  @Input() filtro_anticipo;
  dtOptions: DataTables.Settings = {};
  persons: any;
  public url = '';
  private corporativo_activo: CorporativoActivo;
  public datos_iniciales: DatosIniciales;

  constructor(
    public globals: GlobalsComponent,
    private _storage_service: StorageService,
    private router: Router,
    private _comprobacionesService: ComprobacionesGeneralService,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storage_service.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.url = `${this.globals.host_documentos}/comprobantes/list`;
  }

  ngOnInit() {
    this.actualizaTabla();
  }


  actualizaTabla() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.filtro_anticipo.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
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
        lengthMenu: 'Mostrar _MENU_',
        search: 'BUSCAR',
        zeroRecords: 'No se encontraron resultados',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
      , ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            this.url,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            that.lista_comprobaciones = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      }
    };

  }

  meterFiltros(obj: any) {
    this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    this.filtro_anticipo.identificador_corporativo = this.identificador_corporativo;
    this.filtro_anticipo.aprobador = this.datos_iniciales.usuario.aprobador;
    this.filtro_anticipo.tipo_gasto = 7;

    obj.filt = this.filtro_anticipo;
    obj.esAdmin = true;
    obj.order = [{
      'dir': 'asc'
    }],
      obj.columns = [{
        dir: 'asc'
      }];
    return obj;
  }

  actualizarTabla() {
    console.log(this.filtro_anticipo);
    $('#tabla_comprobaciones_gral').DataTable().ajax.reload();
  }

  reprocesar(id) {
    this.router.navigate(['home', 'validacion', id]);
  }

  detalle(id: any, btn: any) {

    console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    console.log(id);
    this._comprobacionesService.obtenerDetalles(id).subscribe((data: any) => {
      this.detalles = data;
      btn.innerHTML = 'Detalles';
      $('#modal-detalles-comp').modal('show');
    }, error => {
      btn.innerHTML = 'Detalles';
      console.log(error);
    });
  }
}
