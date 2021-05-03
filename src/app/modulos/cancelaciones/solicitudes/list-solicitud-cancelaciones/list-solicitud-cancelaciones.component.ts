import { Component, OnInit } from '@angular/core';
import { FiltroCancelaciones } from 'src/app/entidades';
import Swal, { SweetAlertOptions } from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-list-solicitud-cancelaciones',
  templateUrl: './list-solicitud-cancelaciones.component.html',
  styleUrls: ['./list-solicitud-cancelaciones.component.css']
})
export class ListSolicitudCancelacionesComponent {

  lista_solicitudes = new Array<any>();

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2] },
      }
    ],
    oLanguage: {
      'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      'sLengthMenu': 'Mostrar _MENU_',
      'sZeroRecords': 'No se encontraron resultados',
      'sEmptyTable': 'Ningún dato disponible en esta tabla',
      'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
      'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
      'sInfoPostFix': '',
      'sSearch': 'Buscar:',
      'sUrl': '',
      'sInfoThousands': '',
      'sLoadingRecords': '<img src="assets/img/iconoCargando.gif" alt="">',
      'copy': 'Copiar',
      'oPaginate': {
        'sFirst': 'Primero',
        'sLast': 'Último',
        'sNext': 'Siguiente',
        'sPrevious': 'Anterior'
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  constructor() {
    this.lista_solicitudes = [
      {
        Folio_Fiscal: '',
        Concepto: '',
        Total: '',
        Subtotal: '',
        RFC_Proveedor: '',
        RFC_Contribuyente: '',
        Sucursal: '',
        Archivos: '',
        Estatus_Cancelacion: '',
        Estatus_Solicitud: '',
        Motivo: ''
      }
    ]
    this.actualizarTabla();
  }
  filtrarTabla(filtro: FiltroCancelaciones) {
    console.log(filtro);
  }

  actualizarTabla() {
    $('#tabla_solicitudes').DataTable().destroy();
    // this._departamentoService.obtenerDepartamentoPorCorporativo(
    //   identificador_corporativo
    //   , this.datos_inciales.usuario.identificador_usuario
    //   , Number(this.corporativo_activo.rol_identificador)
    //   ).subscribe((data: HttpResponse<any>) => {
    //     console.log(data);
    //     this.listaDepartamentos = data;
    //   }, error => {
    //     console.log(error);
    //   }, () => {
    setTimeout(() => {
      $('#tabla_solicitudes').DataTable(this.opcionesDt);
    }, 100);
    // });
  }

  cancelar() {
    Swal.fire({
      title: '',
      text: '¿Seguro que desea cancelar esta factura?, la acción es irreversible.',
      input: 'text',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200'
      },
      showCancelButton: true,
      confirmButtonText: 'Si, Rechazar',
      cancelButtonText: 'No, Regresar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        console.log(mensaje);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (mensaje && mensaje !== '') {
              console.log(mensaje);
            } else {
              Swal.showValidationMessage(
                `Error: ${'Debe introducir un mensaje.'}`
              )
              // throw new Error('Debe introducir un mensaje.')
            }
            resolve('');
          }, 1500);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
    });
  }

  rechazar() {
    Swal.fire({
      title: '',
      text: '¿Seguro que desea rechazar la solicitud de cancelación de esta factura?, la acción es irreversible.',
      input: 'text',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '200'
      },
      showCancelButton: true,
      confirmButtonText: 'Si, Rechazar',
      cancelButtonText: 'No, Regresar',
      showLoaderOnConfirm: true,
      preConfirm: (mensaje) => {
        console.log(mensaje);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (mensaje && mensaje !== '') {
              console.log(mensaje);
            } else {
              Swal.showValidationMessage(
                `Error: ${'Debe introducir un mensaje.'}`
              )
              // throw new Error('Debe introducir un mensaje.')
            }
            resolve('');
          }, 1500);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
    });
  }
}
