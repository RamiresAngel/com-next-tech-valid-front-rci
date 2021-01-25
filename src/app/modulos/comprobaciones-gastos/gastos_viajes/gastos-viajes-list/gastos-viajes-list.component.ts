import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViaje } from 'src/app/entidades/gastos-viaje';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { Usuario, FiltroGastosViaje, AprobacionRequest } from 'src/app/entidades';
import { CategoriaService } from 'src/app/modulos/categoria/categoria.service';
import Swal from 'sweetalert2';
import { AcreedoresDiversosService } from 'src/app/modulos/acreedores-diversos/acreedores-diversos.service';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';
declare var $: any;


@Component({
  selector: 'app-gastos-viajes-list',
  templateUrl: './gastos-viajes-list.component.html',
  styleUrls: ['./gastos-viajes-list.component.css']
})
export class GastosViajesListComponent implements OnInit {
  @Input() mostrar_btn;
  @Input() bandeja_aprobacion;
  @Input() administrador?: boolean;
  @Input() lista_documentos = new Array<any>();

  filtro_anticipo = new FiltroGastosViaje();
  public usuario: Usuario;
  public lista_detalle_aprobacion = [];
  public lista_docs_cargados_prev = [];

  public showSolicitudAnticipo = false;
  public listaSolicitudAnticipo: any;
  public array_SolicitudAnticipo: any;
  public corporativo_activo: CorporativoActivo;
  public lista_comprobaciones = new Array<any>();
  dtOptions: DataTables.Settings = {};
  public datos_inciales: DatosIniciales;
  identificador_corporativo: string;
  public esViaje = true;
  public lista_conceptos = [];
  constructor(
    public globals: GlobalsComponent,
    public router: Router,
    private _acreedoresService: AcreedoresDiversosService,
    public _storageService: StorageService,
    public _servicio_categoria: CategoriaService,
    private _gastoViajeService: GastosViajeService
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.funcionFacturas();
    console.log(this.datos_inciales);
  }

  filtrar(filtro: any) {
    this.filtro_anticipo = filtro;
    this.actualizarTabla();
  }


  funcionFacturas() {
    const that = this;
    this.filtro_anticipo.identificador_corporativo = this.identificador_corporativo;

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
        if (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '' &&
          this.filtro_anticipo.sucursal_identificador && this.filtro_anticipo.sucursal_identificador !== '') {
          if (this.bandeja_aprobacion) {
            that._gastoViajeService.listarComprobacionesAprobador(this.meterFiltros(dataTablesParameters))
              .subscribe((resp: any) => {
                if (this.filtro_anticipo.contributente_identificador !== '') {
                  that.lista_comprobaciones = resp.data;
                  callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: []
                  });
                }
              }, () => {
                callback({
                  recordsTotal: 0,
                  recordsFiltered: 0,
                  data: []
                });
              });
          } else {
            that._gastoViajeService.listarComprobaciones(this.meterFiltros(dataTablesParameters))
              .subscribe((resp: any) => {
                if (this.filtro_anticipo.contributente_identificador !== '') {
                  that.lista_comprobaciones = resp.data;
                  callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: []
                  });
                }
              }, () => {
                callback({
                  recordsTotal: 0,
                  recordsFiltered: 0,
                  data: []
                });
              });
          }
        } else {
          this.lista_comprobaciones = new Array<GastosViaje>();
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
        }
      }
    };
  }

  actualizarTabla(filtro?: FiltroGastosViaje) {
    if (filtro) {
      this.filtro_anticipo = filtro;
    }
    $('#tabla_comprobaciones').DataTable().ajax.reload();
  }

  meterFiltros(obj: any) {
    if (!this.administrador) {
      this.filtro_anticipo.usuario_identificador = this.datos_inciales.usuario.identificador_usuario;
    }
    this.filtro_anticipo.aprobador = this.usuario.aprobador;
    // this.filtro_anticipo.tipo_gasto_id = 1;
    obj.filt = this.filtro_anticipo;
    obj.filt.tipo_gasto = 1;
    obj.esAdmin = false;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }



  aprobar(button, gasto_viaje: any) {
    const aprobacion_request = new AprobacionRequest();
    const that = this;
    aprobacion_request.id_solicitud = gasto_viaje.id;
    // aprobacion_request.id_solicitud = gasto_viaje.anticipo ? gasto_viaje.preliminar_id : gasto_viaje.id;
    aprobacion_request.identificador_aprobador = this.datos_inciales.usuario.identificador_usuario;
    aprobacion_request.tipo_gasto = 1;
    button.innerHTML = '';
    button.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>';
    Swal.fire({
      title: 'Alerta',
      text: `Esta apunto de aprobar esta comprobación. ¿Desea continuar?`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          that._gastoViajeService.aprobarComprobacion(aprobacion_request).subscribe((data: any) => {
            resolve(data);
          }, error => {
            Swal.fire('Error', error.error.mensaje ? error.error.mensaje : 'Algo salio mal, por favor inténtelo de nuevo más tarde.', 'error');
            resolve(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (!result.dismiss) {
        if (result.value && result.value.status !== 409) {
          Swal.fire(
            '¡Aprobada!',
            // 'Esta solicitud fue aprobada.',
            result.value.resp.mensaje,
            'success'
          );
          this.actualizarTabla();
        } else {
          if (result.value.status === 409) {
            Swal.fire(
              '¡Error!',
              result.value.error.mensaje,
              'warning'
            );
          }
        }
      }
    })
    button.innerHTML = '<i class="far fa-check-circle"></i>';
  }

  rechazar(gasto_viaje: GastosViaje) {
    const that = this;
    const aprobacion_request = new AprobacionRequest();
    aprobacion_request.id_solicitud = gasto_viaje.id;
    aprobacion_request.identificador_aprobador = this.datos_inciales.usuario.identificador_usuario;
    aprobacion_request.tipo_gasto = 1;
    Swal.fire({
      title: 'Debe introducir un comentario de rechazo.',
      input: 'text',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        return new Promise((resolve) => {
          aprobacion_request.comentario_rechazo = mensaje;
          that._gastoViajeService.rechazarComprobacion(aprobacion_request).subscribe((data: any) => {
            resolve(data);
          }, error => {
            Swal.fire('Error', error.error.mensaje ? error.error.mensaje : 'Algo salio mal, por favor inténtelo de nuevo más tarde.', 'error');
            resolve(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        const mensaje = (result.value && result.value[0] && result.value[0].mensaje) ? result.value[0].mensaje : 'Solicitud rechazada.';
        Swal.fire('Rechazado', mensaje, 'success');
        this.actualizarTabla();
      }
    });
  }


  ActualizaCorporativo(data) {
    const filt = new FiltroGastosViaje();
    filt.identificador_corporativo = data.value;
    this.filtro_anticipo.identificador_corporativo = data.value;
    this.filtrar(filt);
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
  mostrarDetalles(btn_documentos, id_solicitud): void {
    const valor = btn_documentos.innerHTML;
    btn_documentos.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>'
    btn_documentos.disabled = true;
    this._gastoViajeService.obtenerConceptosDocumento(id_solicitud).subscribe((data: any) => {
      this.lista_conceptos = data;
      $('#modal_detalles').modal('toggle');
      btn_documentos.innerHTML = valor;
      btn_documentos.disabled = false;
    }, error => {
      console.log(error);
      btn_documentos.innerHTML = valor;
      btn_documentos.disabled = false;
    });
  }

  verDetallesAprobacion(btn, id: string) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.obtenerDetallesAprobacion(id, '1').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = 'Detalles';
      $('#modal-detalles-validacion').modal('show');
    }, error => {
      btn.innerHTML = 'Detalles';
      if (error.error.mensaje) {
      } else {
        Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
    });
  }

}
