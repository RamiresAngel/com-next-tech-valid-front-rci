
import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { AcreedoresDiversosService } from '../../acreedores-diversos.service';
import { DetalleAcreedorDiverso, Usuario, AccionAprobar } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FlujoAprobacion } from 'src/app/entidades/Acreedor-Diverso';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-acreedores-diversos-rd',
  templateUrl: './list-acreedores-diversos-rd.component.html',
  styleUrls: ['./list-acreedores-diversos-rd.component.css']
})
export class ListAcreedoresDiversosRdComponent implements OnInit {

  @Input() filtro_anticipo: FiltroSolicitudes;
  @Input() mostrar_btn;
  lista_acreedores_diversos: any[] = [];
  private datos_iniciales: DatosIniciales;
  public detalle = new DetalleAcreedorDiverso();
  public dataTablesParameters: any;
  // filtro = new FiltroSolicitudes();
  public corporativo_activo: CorporativoActivo;
  public usuario: Usuario;
  public lista_detalle_aprobacion: FlujoAprobacion[];
  dtOptions: DataTables.Settings = {};

  url_api: string;
  url_api_aprobar: string;
  url_api_rechazar: string;

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    public _acreedoresService: AcreedoresDiversosService,
    private http: HttpClient,
    private router: Router
  ) {
    // this.usuario = this._storageService.getDatosIniciales().usuario;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.usuario = this.datos_iniciales.usuario;
  }

  ngOnInit() {
    console.log(this.datos_iniciales.usuario);

    this.filtro_anticipo = new FiltroSolicitudes();
    this.filtro_anticipo.estatus = 1;
    this.inciarTabla();
    this.url_api = `${this.globals.host_documentos}/gasto/acreedores_diversos/list`;
    this.url_api_aprobar = `${this.globals.host_documentos}/gasto/acreedor_diverso/aprobar`;
    this.url_api_rechazar = `${this.globals.host_documentos}/gasto/acreedor_diverso/rechazar`;
  }

  enviarData(data: any) {
    this.filtro_anticipo = data;
    this.actualizarTabla();
  }

  inciarTabla() {
    const that = this;
    const dataFiltro = this.filtro_anticipo;
    let headers = new HttpHeaders();
    const token = this.datos_iniciales.usuario.token;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.filtro_anticipo.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    this.filtro_anticipo.aprobador = this.datos_iniciales.usuario.aprobador;
    this.filtro_anticipo.estatus = 1;
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
        if (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '' && this.filtro_anticipo.sucursal_identificador && this.filtro_anticipo.sucursal_identificador !== '') {
          that.http
            .post<DataTablesResponse>(
              this.url_api,
              this.meterFiltros(dataTablesParameters), { headers }
            ).subscribe(resp => {
              // that.listaAnticipoGeneral = resp.data;
              that.lista_acreedores_diversos = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              // if (this.filtro_anticipo.contributente_identificador && this.filtro_anticipo.contributente_identificador !== '') {
              //   that.lista_acreedores_diversos = resp.data;
              //   callback({
              //     recordsTotal: resp.recordsTotal,
              //     recordsFiltered: resp.recordsFiltered,
              //     data: []
              //   });
              // } else {
              //   callback({
              //     recordsTotal: 0,
              //     recordsFiltered: 0,
              //     data: []
              //   });
              // }
            });
        } else {
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
        }

      }
    };
  }

  actualizarTabla(filtro?) {
    if (filtro) {
      this.filtro_anticipo = filtro;
    }
    this.filtro_anticipo.aprobador = this.usuario.aprobador;
    this.filtro_anticipo.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    $('#tabla_acreedores_diversos').DataTable().ajax.reload();
  }

  // meterFiltros(obj: any = null, filtro = null) {
  //   obj.filt = this.filtro_anticipo;
  //   this.filtro_anticipo.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
  //   obj.esAdmin = true;
  //   obj.columns = [{
  //     dir: 'asc'
  //   }];
  //   // console.log(obj);
  //   return obj;
  // }

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

  verDetalles(btn: any, id: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.verDetallesAcreedores(id).subscribe((data: any) => {
      this.detalle = data;
      btn.innerHTML = 'Ver';
      $('#modal-detalles-comp').modal('show');
    }, error => {
      btn.innerHTML = 'Ver';
      if (error.error.mensaje) {
      } else {
        Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
    });
  }

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
        aprobacion.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        aprobacion.tipo_gasto = 5;
        aprobacion.documento_id = id_documento;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // this._acreedoresService.aprobarAD(aprobacion).subscribe((data: any) => {
        //   console.log(data);
        // }, error => {
        //   console.log(error);
        // });
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
          if (obj.error_code === 409 || obj.code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500 || obj.code === 500) {
            throw new Error(obj.mensaje);
          }
          if (obj.sap_response && obj.sap_response.type == 'S') {
            // Cuando fue aprobado
            return obj.sap_response;
          }
          if (obj.resp) {
            return obj.resp.mensaje;
          }
          Swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
          // this.actualizarTabla(this.filtro_anticipo);
        }).then((result) => {
          if (result.message) {
            return result.message;
          }
          if (result) {
            return result;
          }
        })
          .catch(error => {
            Swal.showValidationMessage(
              `${error} Para más detalles, verifique la validación.`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.mostrarModalExito(result.value);
      }
    });
  }

  rechazar(id) {
    Swal.fire({
      title: 'Debe introducir un comentario de rechazo',
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
        const rechazo = new AccionAprobar();
        rechazo.id_solicitud = id;
        rechazo.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        rechazo.tipo_gasto = 5;
        rechazo.comentario = mensaje;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // this._acreedoresService.rechazarAD(rechazo).subscribe((data: any) => {
        //   console.log(data);
        // }, error => {
        //   console.log(error);
        // });
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
        }).catch(obj => {
          if (obj.error_code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500) {
            throw new Error(obj.mensaje);
          }
          Swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
          this.actualizarTabla();
        })
          .catch(error => {
            console.log(error);
            Swal.showValidationMessage(
              // `Request failed: ${error}`
              `Ocurrio un error inesperado: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

    });
  }
  cargarNC(id_documento) {
    id_documento = this._storageService.encriptar_ids(String(id_documento));
    this.router.navigateByUrl('home/acreedores_diversos/carga_nc/' + id_documento);
  }
  reprocesar(id) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['home', 'validacion', id]);
  }

  verDetallesAprobacion(btn, id: string) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    this._acreedoresService.obtenerDetallesAprobacion(id, '5').subscribe((data: any) => {
      console.log(data);
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

  mostrarModalExito(msg: string) {
    Swal.fire('Exito', msg, 'success');
    this.actualizarTabla(this.filtro_anticipo);
  }

}
