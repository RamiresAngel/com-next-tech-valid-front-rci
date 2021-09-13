import { IdentificadorUsuario } from './../../../entidades/flujo-aprobacion';
import { Component, OnInit, Input } from '@angular/core';
import { CategoriaService } from '../../categoria/categoria.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { SolicitudGeneralService } from '../solicitud-general.service';
import { AnticipoGeneral } from 'src/app/entidades/anticipoGeneral';
import swal from 'sweetalert2';
import { BandejaAprobacionService } from '../../bandeja-aprobacion/bandeja-aprobacion.service';
import { Usuario } from 'src/app/entidades';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-anticipos-general-mx',
  templateUrl: './list-anticipos-general-mx.component.html',
  styleUrls: ['./list-anticipos-general-mx.component.css']
})
export class ListAnticiposGeneralMxComponent implements OnInit {
  @Input() filtro_anticipo;
  @Input() mostrar_btn;
  public listaAnticipoGeneral = new Array<AnticipoGeneral>();
  public showAnticipoGeneral = false;
  public usuario: Usuario;
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  public dataTablesParameters: any;

  constructor(
    private _servicio_anticipos_general: SolicitudGeneralService,
    private router: Router,
    private _storageService: StorageService,
    public globals: GlobalsComponent,
    private http: HttpClient,
    private _servicioAprobacion: BandejaAprobacionService
  ) {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.usuario = this.datos_iniciales.usuario;
  }

  ngOnInit() {
    console.log(this.datos_iniciales);
    this.filtro_anticipo = new FiltroSolicitudes();
    this.filtro_anticipo.estatus = 1;
    this.cargarAnticipos();
  }

  EditarCategoria(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/solicitud_general/comprobacion_gastos/edit/' + id]);
  }

  obtenerData(data: any) {
    this.listaAnticipoGeneral = data;
  }

  enviarData(filtro: any) {
    this.filtro_anticipo = filtro;
    this.actualizarTabla();
  }

  cargarAnticipos() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.filtro_anticipo.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    this.filtro_anticipo.aprobador = this.datos_iniciales.usuario.aprobador;
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
        processing: 'Procesando...',
        thousands: '',
        lengthMenu: 'Mostrar _MENU_',
        search: 'Buscar',
        zeroRecords: 'No se encontraron resultados',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
      , ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            `${this.globals.host_documentos}/solicitud/anticipo_general/list`,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            // that.listaAnticipoGeneral = resp.data;
            if (this.filtro_anticipo.contributente_identificador !== '') {
              that.listaAnticipoGeneral = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            }
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          },
            (error) => {
              if (error.mensaje) {
                swal.fire(
                  'Atención',
                  'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
                  'error'
                );
              } else {
                swal.fire(
                  'Atención',
                  'Ha ocurrido un error. <br> Por favor intentelo nuevamente más tarde',
                  'error'
                );
              }
            }
          );
      }
    };

  }

  actualizarTabla() {
    $('#tabla_anticipoGeneral').DataTable().ajax.reload();
  }

  meterFiltros(obj: any = null, filtro = null) {
    if (filtro) {
      obj = {};
      obj.filt = filtro;
      this.filtro_anticipo = filtro;
      this.filtro_anticipo.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
      this.filtro_anticipo.aprobador = this.datos_iniciales.usuario.aprobador;
    }
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    // console.log(this.filtro_anticipo);
    obj.filt = this.filtro_anticipo;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    // console.log(obj);
    return obj;
  }
  ActualizaCorporativo(data) {
    const filt = new FiltroSolicitudes();
    filt.identificador_corporativo = data.value;
    this.filtro_anticipo.identificador_corporativo = data.value;
    this.enviarData(filt);
  }

  aprobar(id: any) {
    swal.fire({
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
        const obj = {
          id_solicitud: id.id,
          identificador_aprobador: this.datos_iniciales.usuario.identificador_usuario,
          tipo_gasto: 7
        };
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // ${this.globals.host}
        return fetch(`${this.globals.host_documentos}/solicitud/anticipo_general/aprobar`, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          if (!response.ok) {
            console.log(response);
            throw new Error(response.statusText);
          }
          swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
          this.actualizarTabla();
        })
          .catch(error => {
            console.log(error);
            swal.showValidationMessage(
              // `Request failed: ${error}`
              `Ocurrio un error inesperado: La solicitud no se pudo enviar a SAP`
            );
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      console.log(result);
    });
  }

  cancelar(id) {
    swal.fire({
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
        const obj = {
          id_solicitud: id.id,
          identificador_aprobador: this.datos_iniciales.usuario.identificador_usuario,
          comentario_rechazo: mensaje
        };
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        return fetch(`${this.globals.host_documentos}/solicitud/anticipo_general/rechazar`, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          this.actualizarTabla();
          swal.fire(
            'Éxito',
            'Rechazado correctamente',
            'success'
          );
        })
          .catch(error => {
            console.log(error);
            if (error) {
              swal.fire(
                'Atención',
                'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
                'success'
              );
            } else {
              swal.fire(
                'Atención',
                'Ha ocurrido un error. Intentelo nuevamente más tarde: ',
                'success'
              );
            }

          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {

    });
  }


}
