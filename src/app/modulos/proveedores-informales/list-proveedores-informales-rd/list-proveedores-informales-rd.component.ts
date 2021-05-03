import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProveedoresInformalesService } from '../proveedores-informales.service';
import { FiltroSolicitudes, Usuario, AccionAprobar } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { AcreedoresDiversosService } from '../../acreedores-diversos/acreedores-diversos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
declare var $: any;

@Component({
  selector: 'app-list-proveedores-informales-rd',
  templateUrl: './list-proveedores-informales-rd.component.html',
  styleUrls: ['./list-proveedores-informales-rd.component.css']
})
export class ListProveedoresInformalesRdComponent {
  @Input() mostrar_boton;
  @Output() setPaises = new EventEmitter();

  // Constantes
  readonly id_tipo_gasto = 10;
  // Varibales Componente
  usuario: Usuario;
  url_api_aprobar: string;
  url_api_rechazar: string;

  filtro = new FiltroSolicitudes();
  dtOptions: DataTables.Settings = {};
  lista_porveedor_informal = new Array();
  public dataTablesParameters: any;
  public lista_detalle_aprobacion: any[];
  public detalle_proveedor_informal: any;

  constructor(
    private _storageService: StorageService,
    private _compartidoService: CompartidosService,
    private _router: Router,
    public _globals: GlobalsComponent,
    private _acreedorDiversoService: AcreedoresDiversosService,
    private provedoresInformalesService: ProveedoresInformalesService
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.url_api_aprobar = `${this._globals.host_documentos}/gastos/proveedor_informal/aprobar`;
    this.url_api_rechazar = `${this._globals.host_documentos}/gastos/proveedor_informal/rechazar`;
  }

  ngOnInit(): void {
    this.iniciarTabla();
    this.obtenerPaises();
  }

  iniciarTabla() {
    const that = this;
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
        processing: 'Procesando...',
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
      ajax: (dataTablesParameters: any, callback) => {
        if (this.filtro.sucursal_identificador && this.filtro.contributente_identificador) {
          that.provedoresInformalesService.listpreliminaresProveedorInformal(this.meterFiltros(dataTablesParameters)).subscribe((resp: any) => {
            console.log(resp);
            that.lista_porveedor_informal = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
        }
      }
    };
  }

  filtrar(filtro) {
    this.filtro = filtro;
    $('#tabla_proveedor_informal').DataTable().ajax.reload();
  }

  meterFiltros(obj: any = null) {
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    this.filtro.identificador_corporativo = this.usuario.identificador_corporativo;
    this.filtro.usuario_identificador = this.usuario.identificador_usuario;
    this.filtro.aprobador = this.usuario.aprobador;
    obj.filt = this.filtro;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  //#region Aprobacion y Rechazo


  aprobar(id: any, id_documento: number) {
    Swal.fire({
      title: '¿Realmente deseas aprobar esta solicitud?',
      type: 'info',
      text: '¡Esta acción no se puede revertir!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Aprobar!',
      cancelButtonText: 'Cerrar ventana',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const aprobacion = new AccionAprobar();
        aprobacion.id_solicitud = id;
        aprobacion.identificador_aprobador = this.usuario.identificador_usuario;
        aprobacion.tipo_gasto = this.id_tipo_gasto;
        aprobacion.documento_id = id_documento;
        const token = this.usuario.token;
        return fetch(this.url_api_aprobar, {
          method: 'POST',
          body: JSON.stringify(aprobacion),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          return response.json();
        }).then(obj => {
          console.log(obj);

          if (obj.code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.code === 500) {
            throw new Error(obj.mensaje);
          }
          if (obj.resp && obj.resp.mensaje) {
            const msj = obj.resp.mensaje;
            setTimeout(() => {
              Swal.fire(
                'Éxito',
                msj,
                'success'
              );
            }, 250);
          }
          this.filtrar(this.filtro);
        }).then((result) => {
          console.log(result);
        })
          .catch(error => {
            Swal.showValidationMessage(
              `${error} Para más detalles, verifique la validación.`
            );

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
    });
  }

  rechazar(id: number, id_documento: number) {
    Swal.fire({
      title: 'Debe introducir un comentario de rechazo',
      input: 'text',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        const rechazo = new AccionAprobar();
        rechazo.id_solicitud = id;
        rechazo.documento_id = id_documento;
        rechazo.identificador_aprobador = this.usuario.identificador_usuario;
        rechazo.tipo_gasto = this.id_tipo_gasto;
        rechazo.comentario = mensaje;
        const token = this.usuario.token;
        return fetch(this.url_api_rechazar, {
          method: 'POST',
          body: JSON.stringify(rechazo),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          return response.json();
        }).then(obj => {

          if (obj.error_code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500) {
            throw new Error(obj.mensaje);
          }
          if (obj.length) {
            const msj = obj[0].mensaje;
            setTimeout(() => {
              Swal.fire('Éxito', msj, 'success');
            }, 250);
          }
          console.log(obj);
          this.filtrar(this.filtro);
        })
          .catch(error => {
            console.log(error);
            Swal.showValidationMessage(
              `Ocurrio un error inesperado: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

    });
  }

  //#endregion

  verDetalles(btn: any, id: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedorDiversoService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle_proveedor_informal = data;
      btn.innerHTML = 'Detalle';
      setTimeout(() => {
        $('#modal-detalle-proveedo-informal').modal('show');
      }, 5);
    }, error => {
      btn.innerHTML = 'Detalle';
      console.log(error);
      this.mostarModalError('Erro intentando obtener detalles.');
    });
  }
  verValdiacion(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home', 'validacion', id]);
  }

  verDetallesAprobacion(btn: HTMLButtonElement, id: string) {
    const btn_txt = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    btn.disabled = true;

    this._acreedorDiversoService.obtenerDetallesAprobacion(id, '10').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = btn_txt;
      btn.disabled = false;
      setTimeout(() => {
        $('#modal-detalles-aprobacion').modal('show');
      }, 10);
    }, error => {
      btn.innerHTML = btn_txt;
      btn.disabled = false;
      this.mostarModalError('Error intentando obtener detalles.');
    });
  }


  mostarModalError(mensaje: string = ''): void {
    Swal.fire('¡Error!', mensaje, 'error');
  }

  obtenerPaises() {
    this._compartidoService.obtenerCatalogoPaises().subscribe((data: Array<any>) => {
      this.enviarPaises(data);
    }, err => {
      this.enviarPaises([]);
    });
  }

  enviarPaises(paises: any[]) {
    this._globals.lista_paises_rd = paises;
  }

}

