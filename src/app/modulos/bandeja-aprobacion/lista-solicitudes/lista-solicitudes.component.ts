import { Component, OnInit } from '@angular/core';
import { DatosIniciales, CorporativoActivo, GastosViaje, FiltroSolicitudes } from 'src/app/entidades';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { GastosViajeService } from '../../gastos-viaje/gastos-viaje.service';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {

  public solicitud_anticipo_viaje = 'solicitud_anticipo_viaje';

  public showSolicitudAnticipo = false;
  public listaSolicitudAnticipo: any;
  public array_SolicitudAnticipo: any;
  private datos_iniciales: DatosIniciales;
  public corporativo_activo: CorporativoActivo;
  public filtro_anticipo: any;
  public dataTablesParameters: any;
  public lista_solicitud_anticipo_gasto_viaje = new Array<GastosViaje>();
  filtro = new FiltroSolicitudes();
  dtOptions: DataTables.Settings = {};
  public datos_inciales: DatosIniciales;
  identificador_corporativo: string;
  public esViaje = true;

  constructor(
    public globals: GlobalsComponent,
    public router: Router,
    private http: HttpClient,
    public _storageService: StorageService,
    public _servicio_categoria: CategoriaService,
    private _gastoViajeService: GastosViajeService
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.funcionFacturas();
    console.log(this.datos_inciales);

  }

  enviarData(filtro: any) {
    this.filtro = filtro;
    this.actualizarTabla();
  }

  obtenerData(data: any) {
    this.lista_solicitud_anticipo_gasto_viaje = data;
  }

  funcionFacturas() {
    console.log('entro');
    const that = this;
    const dataFiltro = this.filtro;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.filtro.identificador_corporativo = this.identificador_corporativo;
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
        that.http
          .post<DataTablesResponse>(
            this.globals.host_documentos + '/solicitud/anticipo_gastos_viaje/list',
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            if (this.filtro.contributente_identificador !== '') {
              that.lista_solicitud_anticipo_gasto_viaje = resp.data;
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
    //  Esta es la que trae las solicitudes de General, caja chika y viaje

    $('#tabla_solicitudAnticipo').DataTable().ajax.reload();
  }

  meterFiltros(obj: any = null, filtro = null) {
    if (filtro) {
      obj = {};
      obj.filt = filtro;
      this.filtro_anticipo = filtro;
    }
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    obj.filt = this.filtro_anticipo;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  ActualizaCorporativo(data) {
    const filt = new FiltroSolicitudes();
    filt.identificador_corporativo = data.value;
    this.filtro.identificador_corporativo = data.value;
    this.enviarData(filt);
  }

  aprobar(obj: any) {
    console.log('Mostrar Modal de aprobación');
  }

  rechazar(obj: any) {
    console.log(obj);
  }
}
