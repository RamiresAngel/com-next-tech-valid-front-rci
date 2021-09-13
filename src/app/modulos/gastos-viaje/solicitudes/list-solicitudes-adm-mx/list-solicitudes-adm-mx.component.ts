import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViaje } from 'src/app/entidades/gastos-viaje';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DataTablesResponse, FiltroGastosViaje } from 'src/app/entidades';
import { GastosViajeModule } from '../../gastos-viaje.module';
import { GastosViajeService } from '../../gastos-viaje.service';
declare var $: any;

@Component({
  selector: 'app-list-solicitudes-adm-mx',
  templateUrl: './list-solicitudes-adm-mx.component.html',
  styleUrls: ['./list-solicitudes-adm-mx.component.css']
})
export class ListSolicitudesAdmMxComponent implements OnInit {
  @Input() filtro_anticipo = new FiltroGastosViaje();
  @Input() mostrar_btn;
  private datos_iniciales: DatosIniciales;
  public corporativo_activo: CorporativoActivo;
  public lista_solicitud_anticipo_gasto_viaje = new Array<GastosViaje>();
  dtOptions: DataTables.Settings = {};
  identificador_corporativo: string;
  lista_documentos = new Array<any>();

  constructor(
    public globals: GlobalsComponent,
    public router: Router,
    private http: HttpClient,
    public _storageService: StorageService,
    private _gastoViajeService: GastosViajeService
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.funcionFacturas();
  }

  enviarData(filtro: any) {
    this.filtro_anticipo = filtro;
    this.actualizarTabla();
  }

  obtenerData(data: any) {
    this.lista_solicitud_anticipo_gasto_viaje = data;
  }

  funcionFacturas() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.filtro_anticipo.identificador_corporativo = this.identificador_corporativo;
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
        that._gastoViajeService.listarSolicitudes(this.meterFiltros(dataTablesParameters))
          .subscribe((resp: any) => {
            that.lista_solicitud_anticipo_gasto_viaje = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          }, error => {
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
      }
    };
  }

  actualizarTabla(filtro?: FiltroGastosViaje) {
    if (filtro) {
      this.filtro_anticipo = filtro;
    }
    $('#tabla_solicitudAnticipo').DataTable().ajax.reload();
  }

  meterFiltros(obj: any) {
    this.filtro_anticipo.usuario_identificador = '';
    this.filtro_anticipo.tipo_gasto_id = 1;
    obj.filt = this.filtro_anticipo;
    obj.esAdmin = false;
    obj.columns = [{
      dir: 'asc'
    }];
    console.log(obj);
    return obj;
  }

  ActualizaCorporativo(data) {
    const filt = new FiltroSolicitudes();
    filt.identificador_corporativo = data.value;
    this.filtro_anticipo.identificador_corporativo = data.value;
    this.enviarData(filt);
  }


  mostrarDocumentos(btn_documentos, id_solicitud): void {
    const valor = btn_documentos.innerHTML;
    btn_documentos.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>'
    btn_documentos.disabled = true;
    this._gastoViajeService.obtenerDocumentosIdSolicitud(id_solicitud).subscribe((data: any) => {
      this.lista_documentos = data;
      $('#modal-doc').modal('toggle');
      btn_documentos.innerHTML = valor;
      btn_documentos.disabled = false;
    }, error => {
      console.log(error);
      btn_documentos.innerHTML = valor;
      btn_documentos.disabled = false;
    });
  }
}
