import { Component, OnInit, OnChanges } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-modal-detalle-factura',
  templateUrl: './modal-detalle-factura.component.html',
  styleUrls: ['./modal-detalle-factura.component.css']
})
export class ModalDetalleFacturaComponent implements OnInit, OnChanges {

  /* tabla Lista de detalle */
  public detalle_opcionesDt = {
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
  public list_detalle_factura: [
    {
      linea: string,
      cantidad: string,
      descripcion: string,
      valor_unitario: number,
      unidad: string,
      importe: number,
      concepto: string
    }
  ];

  constructor() {
    this.tablaListdetalle();
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.tablaListdetalle();
  }

  tablaListdetalle() {
    this.list_detalle_factura = [
      {
        linea: '1',
        cantidad: '1.00',
        descripcion: 'Consumo',
        valor_unitario: 985,
        unidad: 'No aplica',
        importe: 985,
        concepto: 'comida de trabajo',
      }
    ];
    setTimeout(() => {
      $('#tabla_detalle_factura').DataTable(this.detalle_opcionesDt);
    }, 1000);
  }

  cerrarModalDetalle() {
    $('#modal_detalle').modal('hide');
  }

}
