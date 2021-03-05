import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-docs-relacionados',
  templateUrl: './modal-docs-relacionados.component.html',
  styleUrls: ['./modal-docs-relacionados.component.css']
})
export class ModalDocsRelacionadosComponent implements OnInit {

  @Input() docs_relacionados: Array<any>;
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
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
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    $('#tabla_documentos').DataTable().destroy();
    setTimeout(() => {
      $('#tabla_documentos').DataTable(this.opcionesDt);
    }, 250);
  }
  modalClose() {
    $('#modal-docs-rel').modal('toggle');
  }
}
