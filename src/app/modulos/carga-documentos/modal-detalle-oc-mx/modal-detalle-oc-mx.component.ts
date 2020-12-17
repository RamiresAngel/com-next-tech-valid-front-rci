import { Component, OnInit, Input } from '@angular/core';
import { OrdenCompra } from 'src/app/entidades/index';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-oc-mx',
  templateUrl: './modal-detalle-oc-mx.component.html',
  styleUrls: ['./modal-detalle-oc-mx.component.css']
})
export class ModalDetalleOcMxComponent implements OnInit {

  @Input() orden_oc: OrdenCompra;
  public opcionesDT = {
    pagingType: 'full_numbers',
    pageLength: 5,
    fixedHeader: {
      header: true,
    },
    oLanguage: {
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
    },
    'responsive': false,
    'deferRender': true,
  }

  constructor() { }

  ngOnChanges() {
    console.log('ngOnChanges');
    console.log(this.orden_oc);
    $('#tabla_detalle').DataTable().destroy();
    setTimeout(() => {
      $('#tabla_detalle').DataTable(this.opcionesDT);
    }, 250);
  }

  ngOnInit() {
    /*  console.log('ngOnInit');
     setTimeout(() => {
       // $(document).ready(function () {
       $('#productos').DataTable(
         {
           pagingType: 'full_numbers',
           pageLength: 1,
           fixedHeader: {
             header: true,
           },
           oLanguage: {
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
           },
           'responsive': false,
           'deferRender': true,
         }
       );
       // }
       // );
     }, 250); */
  }

  modalClose() {
    $('#modal-oc').modal('toggle');
  }

}
