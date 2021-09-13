import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { UsuarioProveedor } from 'src/app/entidades/usuario-proveedor';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { DatosIniciales } from 'src/app/entidades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-list-usuario-proveedor-mx',
  templateUrl: './list-usuario-proveedor-mx.component.html',
  styleUrls: ['./list-usuario-proveedor-mx.component.css']
})
export class ListUsuarioProveedorMxComponent implements OnInit {

  private identificador_corporativo: string;
  private corporativo_activo: CorporativoActivo;
  public lista_usuarios = new Array<UsuarioProveedor>();
  @Input() filtroConsulta;
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  public url = '';

  constructor(
    public globals: GlobalsComponent,
    private _storage_service: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storage_service.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.url = this.globals.host_corporativo + '/usuario/' + this.identificador_corporativo + '/proveedores';
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
            that.lista_usuarios = resp.data;
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
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  actualizarTabla() {
    $('#tabla_proveedores').DataTable().ajax.reload();
  }

  editarDepartamentos(id: string) {
    id = this._storage_service.encriptar_ids(String(id));
    this.router.navigate(['/home/usuario_proveedor/contribuyentes/' + String(id)]);
  }

  /**
   * Direcciona al formulario de edición de usuarios proveedor.
   * - Gadiel Guerrero - 07/05/2019
   * @param id Es el id del usuario que se desea editar.
   */
  editarUsuario(id: any) {
    this.router.navigate(['home', 'usuario_proveedor', 'edit', id]);
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
}
