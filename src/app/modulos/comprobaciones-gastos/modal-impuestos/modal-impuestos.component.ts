import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-impuestos',
  templateUrl: './modal-impuestos.component.html',
  styleUrls: ['./modal-impuestos.component.css']
})
export class ModalImpuestosComponent implements OnInit {

  /* tabla Lista de impuestos */
  public opcionesDt = {
    ordering: false,
    dom: 'lfrtip',
    scrollX: true,
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
  public list_impuesto: [
    {
      linea: number,
      id_impuesto: number,
      tipo: string,
      tasa: number,
      importe_original: number,
      retencion: string,
      local: string
      /* importe_asignado: string */
      total_restante: number
      asignar_tipo: string
    }
  ];

  constructor() {
    this.tablaListImpuesto();
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.tablaListImpuesto();
  }

  tablaListImpuesto() {
    this.list_impuesto = [
      {
        linea: 1,
        id_impuesto: 1.00,
        tipo: 'IVA',
        tasa: 16.00,
        importe_original: 157.65,
        retencion: ' ',
        local: ' ',
        /* importe_asignado: 157.65, */
        total_restante: 0.00,
        asignar_tipo: ' ',
      }
    ];
    setTimeout(() => {
      $('#tabla_impuestos').DataTable(this.opcionesDt);
    }, 1000);
  }

  cerrarModalDetalle() {
    $('#modal_impuestos').modal('hide');
  }

}
