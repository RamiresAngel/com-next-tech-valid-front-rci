import { CodigoRecepcion } from './../../../entidades/codigo-recepcion';
import { Component, OnInit, Input } from '@angular/core';
import { CorporativoActivo, DatosIniciales, ProveedorMin } from 'src/app/entidades';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-codigo-mx',
  templateUrl: './list-codigo-mx.component.html',
  styleUrls: ['./list-codigo-mx.component.css']
})
export class ListCodigoMxComponent implements OnInit {

  public array_sucursales: any;
  public detalles_cr: any;
  public listaCorporativos: any;
  public showCorporativos = false;
  public corporativo_activo: CorporativoActivo;
  public identificador_corporativo = '';
  public lista_codigos = new Array<CodigoRecepcion>();
  @Input() filtroConsulta;
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  persons: any;
  public url = '';

  constructor(
    private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
    , public _servicio_proveddores: ProveedoresService
    , private _compartidos: CompartidosService
    , private http: HttpClient
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.url = this.globals.host_documentos + '/codigo_recepcion/list';
  }
  ngOnInit() {
    this.funcionFacturas();
  }


  funcionFacturas() {
    const that = this;
    const dataFiltro = this.filtroConsulta;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
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
        lengthMenu: 'Mostrar _MENU_',
        search: 'Buscar',
        processing: 'Buscando...',
        zeroRecords: 'No se encontraron resultados',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        }
      }
      , ajax: (dataTablesParameters: any, callback) => {
        if (this.filtroConsulta.identificador_contribuyente && this.filtroConsulta.sucursal_identificador) {
          that.http.post<DataTablesResponse>(
            this.url,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            that.lista_codigos = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
        } else {
          that.http.post<DataTablesResponse>(
            this.url,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            that.lista_codigos = [];
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
        }
      }
    };

  }

  actualizarTabla() {
    $('#tabla_proveedores').DataTable().ajax.reload();
  }

  meterFiltros(obj: any) {
    this.filtroConsulta.listtype = 'list';
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  actualizaCorporativo(obj: any) {
    console.log('Cambio de corporativo');
  }

  verDetalles(buttin, id) {
    buttin.innerHTML = '<i class="fa fa-spinner fa-spin fa-fw"></i>';
    this._compartidos.obtenerDetalleCR(id).subscribe(data => {
      this.detalles_cr = data;
      buttin.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
      $('#modal-detalle-cr').modal('toggle');
    }, error => {
      buttin.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
    });
  }
}
