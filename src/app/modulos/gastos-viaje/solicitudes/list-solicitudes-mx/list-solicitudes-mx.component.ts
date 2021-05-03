import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViaje } from 'src/app/entidades/gastos-viaje';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DataTablesResponse, Usuario, FiltroGastosViaje, AprobacionRequest } from 'src/app/entidades';
import { CategoriaService } from 'src/app/modulos/categoria/categoria.service';
import { GastosViajeService } from '../../gastos-viaje.service';
import Swal from 'sweetalert2';
import { AcreedoresDiversosService } from 'src/app/modulos/acreedores-diversos/acreedores-diversos.service';
declare var $: any;


@Component({
  selector: 'app-list-solicitudes-mx',
  templateUrl: './list-solicitudes-mx.component.html',
  styleUrls: ['./list-solicitudes-mx.component.css']
})
export class ListSolicitudesMxComponent implements OnInit {
  public solicitud_anticipo_viaje = 'solicitud_anticipo_viaje';
  @Input() bandeja_aprobacion: boolean;
  @Input() filtro_anticipo: FiltroGastosViaje;
  @Input() mostrar_btn;

  lista_documentos = new Array<any>();
  public usuario: Usuario;
  aprobacion_request = new AprobacionRequest();
  public lista_detalle_aprobacion = [];

  public showSolicitudAnticipo = false;
  public listaSolicitudAnticipo: any;
  public array_SolicitudAnticipo: any;
  private datos_iniciales: DatosIniciales;
  public corporativo_activo: CorporativoActivo;
  public lista_solicitud_anticipo_gasto_viaje = new Array<any>();
  // filtro = new FiltroSolicitudes();
  dtOptions: DataTables.Settings = {};
  public datos_inciales: DatosIniciales;
  identificador_corporativo: string;
  public esViaje = true;

  constructor(
    public globals: GlobalsComponent,
    public router: Router,
    public _storageService: StorageService,
    public _servicio_categoria: CategoriaService,
    private _gastoViajeService: GastosViajeService,
    private _acreedoresService: AcreedoresDiversosService
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.funcionFacturas();
  }

  enviarData(filtro: any) {
    this.filtro_anticipo = filtro;
    this.actualizarTabla();
  }

  funcionFacturas() {
    const that = this;
    const dataFiltro = this.filtro_anticipo;
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
        if (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '' &&
          this.filtro_anticipo.sucursal_identificador && this.filtro_anticipo.sucursal_identificador !== '') {
          if (this.bandeja_aprobacion) {
            that._gastoViajeService.listarSolicitudesAprobador(this.meterFiltros(dataTablesParameters))
              .subscribe((resp: any) => {
                if (this.filtro_anticipo.contributente_identificador !== '') {
                  that.lista_solicitud_anticipo_gasto_viaje = resp.data;
                  callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: []
                  });
                }
              }, error => {
                callback({
                  recordsTotal: 0,
                  recordsFiltered: 0,
                  data: []
                });
              });
          } else {
            that._gastoViajeService.listarSolicitudes(this.meterFiltros(dataTablesParameters))
              .subscribe((resp: any) => {
                if (resp && (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '')) {
                  that.lista_solicitud_anticipo_gasto_viaje = resp.data;
                  callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: []
                  });
                } else {
                  that.lista_solicitud_anticipo_gasto_viaje = new Array<GastosViaje>();
                  callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: []
                  });
                }
              }, error => {
                callback({
                  recordsTotal: 0,
                  recordsFiltered: 0,
                  data: []
                });
              });
          }
        } else {
          this.lista_solicitud_anticipo_gasto_viaje = new Array<GastosViaje>();
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
    try {
      $('#tabla_solicitudAnticipo').DataTable().ajax.reload();
    } catch (error) {
      // this.actualizarTabla();
      console.log(error);
    }
  }

  meterFiltros(obj: any) {
    this.filtro_anticipo.usuario_identificador = this.datos_inciales.usuario.identificador_usuario;
    this.filtro_anticipo.tipo_gasto_id = 1;
    this.filtro_anticipo.aprobador = this.usuario.aprobador;
    obj.filt = this.filtro_anticipo;
    obj.esAdmin = false;
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  ActualizaCorporativo(data) {
    const filt = new FiltroGastosViaje();
    filt.identificador_corporativo = data.value;
    this.filtro_anticipo.identificador_corporativo = data.value;
    this.enviarData(filt);
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
    this._gastoViajeService.getPendientesComprobar(gasto_viaje.id).subscribe((data: any) => {
      if (data.length > 1) {
        Swal.fire({
          title: 'Alerta',
          text: `Este usuario tiene ${data.length - 1} solicitudes pendientes. ¿Desea continuar?`,
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Continuar',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return new Promise((resolve, reject) => {
              that._gastoViajeService.aprobarSolicitud(aprobacion_request).subscribe((data: any) => {
                resolve(data);
              }, error => {
                Swal.fire('Error', 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
                resolve(error);
              });
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          console.log(result);
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
        })
      } else {
        Swal.fire({
          title: 'Alerta',
          text: `Esta apunto de aprobar esta solicitud. ¿Desea continuar?`,
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Continuar',
        }).then((result) => {
          if (result.value) {
            this._gastoViajeService.aprobarSolicitud(aprobacion_request).subscribe((data: any) => {
              Swal.fire(
                '¡Aprobada!',
                data.resp.mensaje ? data.resp.mensaje : 'Esta solicitud fue aprobada.',
                'success'
              );
              this.actualizarTabla();
            }, error => {
              Swal.fire('Error', 'Algo salio mal, por favor inténtelo de nuevo mas tarde.', 'error');
            });
          }
        })
      }
      button.innerHTML = '<i class="far fa-check-circle"></i>';
    }, error => {
      button.innerHTML = '<i class="far fa-check-circle"></i>';
      console.log(error);
    });
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
        autocapitalize: 'off',
        maxlength: '200'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Rechazar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        return new Promise((resolve, reject) => {
          aprobacion_request.comentario_rechazo = mensaje;
          that._gastoViajeService.rechazarSolicitud(aprobacion_request).subscribe((data: any) => {
            const mensaje = 'Solicitud rechazada.';
            Swal.fire('Rechazado', mensaje, 'success');
            this.actualizarTabla();
            resolve(data);
          }, error => {
            Swal.fire('Error', 'Algo salio mal, por favor intentelo de nuevo mas tarde.', 'error');
            resolve(error);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
    });
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
