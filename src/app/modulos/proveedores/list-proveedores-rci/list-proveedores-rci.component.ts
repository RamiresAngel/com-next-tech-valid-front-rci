import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-proveedores-rci',
  templateUrl: './list-proveedores-rci.component.html',
  styleUrls: ['./list-proveedores-rci.component.css']
})
export class ListProveedoresRciComponent implements OnInit {
  @Input() tipo_erp: string;
  @Input() filtroConsulta;
  listener: () => void;
  public corporativo_activo: CorporativoActivo;
  public identificador_corporativo = '';
  public lista_proveedores_rci = new Array<any>();
  public vista_carga: string;
  private datos_iniciales: DatosIniciales;
  dtOptions: any = {};
  persons: any;
  public url = '';

  constructor(
    private router: Router,
    private _storageService: StorageService,
    private renderer: Renderer2,
    public globals: GlobalsComponent,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    // this.url = this.globals.host + 'api/v1/validm/corporativo/proveedor/' + this.identificador_corporativo + '/corporativo';
    // tslint:disable-next-line:max-line-length
    // this.url = `${this.globals.host_corporativo}/proveedor/${this.identificador_corporativo}/corporativo/${this.datos_iniciales.usuario.identificador_usuario}/usuario/${this.corporativo_activo.rol_identificador}/rol`;
    this.url = `${this.globals.host_corporativo}/proveedor/${this.identificador_corporativo}/corporativo`;
    this.vista_carga = this.datos_iniciales.funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
  }

  ngOnInit() {
    this.funcionFacturas();
  }

  ngAfterViewInit(): void {
    const that = this;
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('editar_proveedor')) {
        const cfdi = event.target.getAttribute('editar_proveedor');
        const id_proveedor = JSON.parse(cfdi);
        that.editarProveedorRci(id_proveedor);
      }
    });
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
      ordering: false,
      dom: 'lBfrtip',
      searching: false,
      columns: [
        { title: 'Nombre', data: 'nombre' },
        { title: 'Número Proveedor', data: 'numero_proveedor' },
        { title: 'RFC', data: 'rfc' },
        { title: 'Correo', data: 'correo' },
        // { title: 'Nombre Sitio', data: 'numero_proveedor' },
        { title: 'Estatus', data: 'estatus_descripcion' },
        {
          title: 'Editar', render(data: any, type: any, proveedor: any) {
            const texto = that.globals.menuDinamico.gestion_Proveedores_Edit ? `<button *ngIf="proveedor.relacionados" class="btn ml-2" editar_proveedor =${proveedor.id}> <i class="fas fa-file mr-1"></i> Editar </button>` : '';
            return texto;
          }
        }
      ],
      buttons: [
        {
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn-sm',
          exportOptions: { columns: [0, 1, 2, 3, 4] },
        },
        {
          extend: 'pdfHtml5',
          text: 'Exportar PDF',
          className: 'btn-sm',
          orientation: 'landscape',
          pageSize: 'TABLOID',
          exportOptions: { columns: [0, 1, 2, 3, 4] },
        }
      ],
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
            // that.lista_proveedores_rci = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
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
    console.log('filtro rci', this.filtroConsulta);
    $('#tabla_proveedores_rci').DataTable().ajax.reload();
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

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.url = this.globals.host_corporativo + '/proveedor/' + this.identificador_corporativo + '/corporativo';
    this.actualizarTabla();
  }

  editarProveedorRci(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/proveedores/edit/' + String(id)]);
  }

}
