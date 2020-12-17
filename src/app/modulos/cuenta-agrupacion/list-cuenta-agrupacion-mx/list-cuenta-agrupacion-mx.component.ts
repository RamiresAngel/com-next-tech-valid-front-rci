import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CuentaAgrupacion } from 'src/app/entidades/CuentaAgrupacion';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CuentaAgrupacionService } from '../cuenta-agrupacion.service';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { DatosIniciales } from 'src/app/entidades';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-cuenta-agrupacion-mx',
  templateUrl: './list-cuenta-agrupacion-mx.component.html',
  styleUrls: ['./list-cuenta-agrupacion-mx.component.css']
})
export class ListCuentaAgrupacionMxComponent implements OnInit {

  listener: () => void;
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  dtOptions: any = {};


  datos_inciales: DatosIniciales;
  lista_cuenta_agrupacion: CuentaAgrupacion[];
  cuenta_agrupacion = new CuentaAgrupacion();
  identificador_corporativo: string;

  public corporativo_activo;

  constructor(
    public globals: GlobalsComponent,
    private _router: Router,
    private _storageService: StorageService,
    private renderer: Renderer2,
    private _cuentaAgrupacionService: CuentaAgrupacionService
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.lista_cuenta_agrupacion = new Array<CuentaAgrupacion>();
    this.actualizarTabla();
  }

  ngAfterViewInit(): void {
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('relacion_id')) {
        console.log(event.target);
        const id = event.target.getAttribute('relacion_id');
        this.eliminarCuentaAgrupacion(id);
      }
    });
  }


  // actualizarTabla() {
  //   $('#tabla_cuenta_agrupacion').DataTable().destroy();
  //   this._cuentaAgrupacionService.obtnerCuetnaAgrupacion(
  //     this.identificador_corporativo
  //     , this.datos_inciales.usuario.identificador_usuario
  //     , Number(this.corporativo_activo.rol_identificador)
  //     )
  //     .subscribe((data: HttpResponse<CuentaAgrupacion[]>) => {
  //       this.obtnerCuentaAgrupacion(data);
  //     }, error => {
  //       console.log(error);
  //     }, () => {
  //       setTimeout(() => {
  //         $('#tabla_cuenta_agrupacion').DataTable(this.opcionesDt);
  //       }, 1000);
  //     });
  // }


  actualizarTabla() {
    console.log('fyu');

    // $('#tabla_cuenta_agrupacion').DataTable().destroy();
    const that = this;
    this.dtOptions = {
      pageLength: 10,
      stateSave: true,
      lengthChange: true,
      lengthMenu: [[10, 25, 50, 100, 2000], [10, 25, 50, 100, '2000 (max)']],
      serverSide: true,
      searching: false,
      processing: true,
      autoWidth: true,
      scrollX: true,
      // ordering: false,
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
      },
      columns:
        [
          { title: 'Contribuyente', data: 'contribuyente' },
          { title: 'Cuenta', data: 'cuenta' },
          { title: 'Departamento', data: 'departamento' },
          {
            title: 'Acción', render(data: any, type: any, relacion_id: any) {
              const texto = that.globals.menuDinamico.administracion_Cuenta_Agrupacion_Delete ? `<button class="btn btn-danger text-white ml-1 eliminar-cuenta-agrupacion" relacion_id =${relacion_id.id}> <i class="fas fa-file mr-1"></i> Eliminar </button>` : '';
              return texto;
            }
          }
        ],
      dom: 'lBfrtip',
      buttons: [
        { extend: 'csv', text: 'Exportar CSV' }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        that._cuentaAgrupacionService.obtenerCuentaAgrupacionSS(this.meterFiltros(dataTablesParameters)).subscribe((resp: DataTablesResponse) => {
          // if (true) {
          // that.lista_cfdis = resp.data;
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

  meterFiltros(obj: any) {

    obj.filt = {
      identificador_corporativo: this.identificador_corporativo,
      identificador_usuario: this.datos_inciales.usuario.identificador_usuario,
      rol_id: this.corporativo_activo.rol_identificador,
      listtype: "list"
    };
    obj.esAdmin = true;
    obj.order = [{
      'dir': 'asc'
    }],
      obj.columns = [{
        dir: 'asc'
      }];
    return obj;
  }

  // actualizarTabla() {
  //   // $('#tabla_cuenta_agrupacion').DataTable().ajax.reload(null, false);
  // }
  obtnerCuentaAgrupacion(data: any) {
    this.lista_cuenta_agrupacion = data;
  }
  editarCuentaAgrupacion(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/cuenta_agrupacion/edit/' + String(id)]);
  }
  eliminarCuentaAgrupacion(id: any) {
    console.log(id);
    swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      text: 'No podrá deshacer esta acción. ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this._cuentaAgrupacionService.eliminarCuentaAgrupacion(id).subscribe((data: HttpResponse<any>) => {
          this.actualizarTabla();
          swal.fire(
            '¡Eliminado!',
            'Este dato ha sido eliminado correctamente.',
            'success'
          );
        }, error => {
          console.log(error);
        });
      }
    });
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.actualizarTabla();
  }
}
