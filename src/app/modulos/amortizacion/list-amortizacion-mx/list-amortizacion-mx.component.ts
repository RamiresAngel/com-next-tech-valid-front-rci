import { Component, OnInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario, FiltroAmortizadores, DetalleAmortizacion, AccionAprobar } from 'src/app/entidades';
import { AmortizacionService } from '../amortizacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AcreedoresDiversosService } from '../../acreedores-diversos/acreedores-diversos.service';
import { FlujoAprobacion } from 'src/app/entidades/Acreedor-Diverso';
declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-list-amortizacion-mx',
  templateUrl: './list-amortizacion-mx.component.html',
  styleUrls: ['./list-amortizacion-mx.component.css']
})
export class ListAmortizacionMxComponent implements OnInit {

  @Input() mostrar_btn;
  lista_amortizadores: any[] = [];
  lista_detalle_aprobacion: FlujoAprobacion[];
  public identificador_corporativo = '';
  public corporativo_activo: CorporativoActivo;
  public dataTablesParameters: any;
  public mensaje_rechazo: string;
  public usuario: Usuario;
  @Input() filtroConsulta: FiltroAmortizadores;
  // @Input() filtro_anticipo;
  private datos_iniciales: DatosIniciales;
  dtOptions: DataTables.Settings = {};
  public url = '';
  public detalles = new DetalleAmortizacion();

  constructor(
    public globals: GlobalsComponent,
    private _acreedorDiversoService: AcreedoresDiversosService,
    public _storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private amortizacionService: AmortizacionService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.usuario = this.datos_iniciales.usuario;
    this.url = `${this.globals.host_documentos}/gasto/amortizaciones/list`;
  }

  ngOnInit() {
    this.inciarTabla();
  }

  inciarTabla() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    // this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    // this.filtroConsulta.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
    this.filtroConsulta.aprobador = this.datos_iniciales.usuario.aprobador;
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
      }
      , ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            this.url,
            this.meterFiltros(dataTablesParameters), { headers }
          ).subscribe(resp => {
            if (this.filtroConsulta.contributente_identificador !== '' && this.filtroConsulta.identificador_corporativo !== '') {
              console.log(resp);
              that.lista_amortizadores = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            } else {

              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            }
          });
      }
    };
  }

  actualizarTabla() {
    if (this.filtroConsulta.acreedor_identificador || this.filtroConsulta.acreedor_identificador !== '') {
      this.filtroConsulta.acreedor_identificador = this.datos_iniciales.usuario.identificador_usuario;
    }
    this.filtroConsulta.aprobador = this.usuario.aprobador;
    console.log(this.filtroConsulta);

    $('#tabla_amortizacion').DataTable().ajax.reload();
  }

  meterFiltros(obj: any = null, filtro = null) {
    if (filtro) {
      obj = {};
      obj.filt = filtro;
      this.filtroConsulta = filtro;
      this.filtroConsulta = filtro;
      this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.filtroConsulta.usuario_identificador = this.datos_iniciales.usuario.identificador_usuario;
      this.filtroConsulta.aprobador = this.datos_iniciales.usuario.aprobador;
    }
    if (obj) {
      this.dataTablesParameters = obj;
    } else {
      obj = this.dataTablesParameters;
    }
    // console.log(this.filtroConsulta);
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.columns = [{
      dir: 'asc'
    }];
    // console.log(obj);
    return obj;
  }

  verDetalles(id: any, boton: any) {
    boton.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.amortizacionService.obtenerDetallesAmortizacion(id)
      .subscribe((data: any) => {
        this.detalles = data;
        $('#modal-det-amortizacion').modal('show');
        boton.innerHTML = 'Detalles';
        console.log(id);
      });
  }

  aprobar(id: any) {
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
        aprobacion.tipo_gasto = 6;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        return fetch(`${this.globals.host_documentos}/gasto/amortizaciones/aprobar`, {
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
          if (obj.error_code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500) {
            throw new Error(obj.mensaje);
          }
          this.actualizarTabla();
          Swal.fire(
            'Éxito',
            'Aprobado correctamente',
            'success'
          );
        })
          .catch(error => {
            Swal.showValidationMessage(
              `Error: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
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
        rechazo.tipo_gasto = 6;
        rechazo.comentario = mensaje;
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        return fetch(`${this.globals.host_documentos}/gasto/amortizaciones/rechazar`, {
          method: 'POST',
          body: JSON.stringify(rechazo),
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
          Swal.fire(
            'Éxito',
            'Rechazado correctamente',
            'success'
          );
        })
          .catch(error => {
            console.log(error);
            if (error) {
              Swal.fire(
                'Atención',
                'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
                'success'
              );
            } else {
              Swal.fire(
                'Atención',
                'Ha ocurrido un error. Intentelo nuevamente más tarde: ',
                'success'
              );
            }

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

    });
  }

  reprocesar(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    console.log(id);
    this.router.navigate(['home', 'validacion', id]);
  }
  verDetallesAprobacion(btn, id: string) {
    console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    console.log(id);
    this._acreedorDiversoService.obtenerDetallesAprobacion(id, '6').subscribe((data: any) => {
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
}
