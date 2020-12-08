import { Component, OnInit, Input } from '@angular/core';
import { SucursalService } from '../../sucursal/sucursal.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ProveedoresService } from '../proveedores.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { ProveedorMin } from 'src/app/entidades/proveedor';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-proveedores-mx',
  templateUrl: './list-proveedores-mx.component.html',
  styleUrls: ['./list-proveedores-mx.component.css']
})
export class ListProveedoresMxComponent implements OnInit {
  @Input() tipo_erp: string;

  public array_sucursales: any;
  public listaCorporativos: any;
  public showCorporativos = false;
  public corporativo_activo: CorporativoActivo;
  public identificador_corporativo = '';
  public lista_proveedores = new Array<any>();
  public vista_carga: string;
  @Input() filtroConsulta;
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  persons: any;
  public url = '';

  constructor(
    private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
    , private http: HttpClient
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    // this.url = this.globals.host + 'api/v1/validm/corporativo/proveedor/' + this.identificador_corporativo + '/corporativo';
    // tslint:disable-next-line:max-line-length
    this.url = `${this.globals.host_corporativo}/proveedor/${this.identificador_corporativo}/corporativo/${this.datos_iniciales.usuario.identificador_usuario}/usuario/${this.corporativo_activo.rol_identificador}/rol`;
    this.vista_carga = this.datos_iniciales.funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;

  }
  ngOnInit() {
    this.funcionFacturas();
  }


  funcionFacturas() {
    const that = this;
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
      // scrollX: true,
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
            this.url,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            that.lista_proveedores = resp.data;
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

  actualizarTabla() {
    $('#tabla_proveedores').DataTable().ajax.reload();
  }

  meterFiltros(obj: any) {
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    console.log(obj);
    return obj;
  }

  editarProveedor(id: any) {
    id = this._storageService.encriptar_ids(String(id));

    if (this.vista_carga === 'carga_doc_no_erp') {
      this.router.navigate(['/home/formulario_proveedor/edit/' + String(id)]);
    } else {
      this.router.navigate(['/home/proveedores/edit/' + String(id)]);
    }
  }

  editarDepartamentos(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/proveedores/editDep/' + String(id)]);
  }

  editarTiposGasto(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/proveedores/tipo_gasto/' + String(id)]);
  }

  editarCuentas(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/proveedores/cuenta/' + String(id)]);
  }

  editarEstadoCuenta(id: any, numero_proveedor: string) {
    id = this._storageService.encriptar_ids(String(id));
    numero_proveedor = this._storageService.encriptar_ids(String(numero_proveedor));
    this.router.navigate([`/home/saldos/${String(id)}/${String(numero_proveedor)}`]);
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.url = this.globals.host_corporativo + '/proveedor/' + this.identificador_corporativo + '/corporativo';
    this.actualizarTabla();
  }
  verContribuyentes(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    if (this.tipo_erp === 'carga_doc_no_erp') {
      this.router.navigate(['/home/usuario_proveedor/contribuyentes/' + String(id)]);
    } else {
      this.router.navigate([`/home/proveedores/contribuyentes/${id}`]);
    }
  }
}
