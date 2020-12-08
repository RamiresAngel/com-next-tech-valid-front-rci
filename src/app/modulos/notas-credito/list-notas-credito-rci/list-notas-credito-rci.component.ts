import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-notas-credito-rci',
  templateUrl: './list-notas-credito-rci.component.html',
  styleUrls: ['./list-notas-credito-rci.component.css']
})
export class ListNotasCreditoRciComponent implements OnInit {
  @Input() mostrar_boton;
  /* se cambiara la tabla a modo de sabersi */
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: true,
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3] },
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
  }; dtOptions: DataTables.Settings = {};
  public listaprueba = [];
  constructor() { }

  ngOnInit() {

  }

  tabla() {
    this.listaprueba = [];
    setTimeout(() => {
      $('#list_notas_credito ').DataTable(this.opcionesDt);
    }, 1000);
  }


}
