import { Component, OnInit, Input } from '@angular/core';
import { Cfdi, ComplementoDePago, DocumentoRelacionado } from 'src/app/entidades/cfdi';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorporativoActivo, DatosIniciales, FiltroCFDI } from 'src/app/entidades';
import { ListarCfdiService } from '../listar-cfdi.service';
import Swal from 'sweetalert2';

declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-listar-estatus-cfdi',
  templateUrl: './listar-estatus-cfdi.component.html',
  styleUrls: ['./listar-estatus-cfdi.component.css']
})
export class ListarEstatusCfdiComponent implements OnInit {

  complementos_pago = new ComplementoDePago();
  documentos_relacionados = new Array<DocumentoRelacionado>();

  public array_sucursales: any;
  public lista_cfdis: Array<Cfdi>;
  public complementos: Array<Cfdi>;
  public showCorporativos = false;
  public identificador_corporativo = '';
  filtroConsulta = new FiltroCFDI();
  // @Input() filtroConsulta;
  dtOptions: DataTables.Settings = {};
  persons: any;
  public url = '';
  private corporativo_activo: CorporativoActivo;
  private datos_iniciales: DatosIniciales;

  constructor(
    public globals: GlobalsComponent,
    private _storage_service: StorageService,
    private _listarcfdiService: ListarCfdiService,
    private router: Router,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storage_service.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.url = `${this.globals.host_documentos}/list`;
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
            // if (true) {
            if (this.filtroConsulta.sucursal_identificador !== '0' &&
              this.filtroConsulta.sucursal_identificador !== ''
            ) {
              that.lista_cfdis = resp.data;
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

  meterFiltros(obj: any) {
    if (this.filtroConsulta.rfc_proveedor === '') {
      const usr = this.datos_iniciales.usuario;
      this.filtroConsulta.rfc_proveedor = usr.rfc;
    }

    this.filtroConsulta.identificador_corporativo = this.identificador_corporativo;
    this.filtroConsulta.tipo_movimiento_doc = this.filtroConsulta.tipo_movimiento_doc as number;

    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.order = [{
      'dir': 'asc'
    }],
      obj.columns = [{
        dir: 'asc'
      }];
    return obj;
  }

  actualizarTabla(filtro) {
    this.filtroConsulta = filtro;
    $('#tabla_documentos').DataTable().ajax.reload();
  }

  reprocesar(id) {
    id = this._storage_service.encriptar_ids(String(id));
    this.router.navigate(['home', 'validacion', id]);
  }

  eliminarDocumento(uuid) {
    Swal.fire({
      title: '<strong>Eliminar Documento</strong>',
      type: 'warning',
      html:
        'Estas seleccionando eliminar un documento<b> esta operacion en irreversible</b>,  ' +
        ' y afectara el documento y las relaciones con  órdenes de compra, preliminares  y números de recepción ' +
        '</br> Desea continuar con la operación? ',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fas fa-check"></i>',
      confirmButtonAriaLabel: 'Ok',
      cancelButtonText:
        '<i class="far fa-times-circle"></i>',
      cancelButtonAriaLabel: 'Cancelar'
    }).then(resp => {
      if (resp.value === true) {
        this._listarcfdiService.eliminarDocumento(uuid, this.datos_iniciales.usuario.identificador_usuario)
          .subscribe((result) => {
            Swal.fire('Resultado', result as string, 'info');
          }, error => {
            Swal.fire('Error en la operacion', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
          });
      } else {
        Swal.fire('Operacion Cancelada', 'El documento no fue eliminado', 'info');
      }
    }).catch(error => {
      Swal.fire('Error en la operacion', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
    });
  }

  mostrarComplemento(id_cfdi: string, btn: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin fa-fw"></i>';
    this._listarcfdiService.obtenerComplementos(id_cfdi)
      .subscribe((data: any) => {
        this.complementos_pago = data;
        this._listarcfdiService.obtenerRelacionados(id_cfdi)
          .subscribe((data2: any) => {
            this.documentos_relacionados = data2;
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
            $('#complementeto_detalle').modal('show');
          }, err => {
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
          });
      }, error => {
        btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
      });
  }



  modalReasignar(uuid: string, btn: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin fa-fw"></i>';
    Swal.fire({
      title: 'Ingrese una Orden de Compra',
      input: 'text',
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      showLoaderOnConfirm: false,
      preConfirm: (mensaje) => {
        this.router.navigate(['carga_documentos', mensaje, uuid]);
        // const rechazo = new AccionAprobar();
        // rechazo.id_solicitud = id;
        // rechazo.identificador_aprobador = this.datos_iniciales.usuario.identificador_usuario;
        // rechazo.tipo_gasto = 5;
        // rechazo.comentario_rechazo = mensaje;
        // this.datos_iniciales = this._storageService.getDatosIniciales();
        // const token = this.datos_iniciales.usuario.token;
        // return fetch(this.url_api_rechazar, {
        //   method: 'POST',
        //   body: JSON.stringify(rechazo),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': token
        //   }
        // }
        // ).then(response => {
        //   return response.json();
        // }).catch(obj => {
        //   if (obj.error_code === 409) {
        //     throw new Error(obj.mensaje);
        //   }
        //   if (obj.error_code === 500) {
        //     throw new Error(obj.mensaje);
        //   }
        //   Swal.fire(
        //     'Éxito',
        //     'Aprobado correctamente',
        //     'success'
        //   );
        //   // this.actualizarTabla();
        // })
        //   .catch(error => {
        //     console.log(error);
        //     Swal.showValidationMessage(
        //       // `Request failed: ${error}`
        //       `Ocurrio un error inesperado: ${error}`
        //     );
        //   });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

    });



    btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';

  }

}
