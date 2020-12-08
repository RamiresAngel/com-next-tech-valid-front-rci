import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-list-credenciales',
  templateUrl: './list-credenciales.component.html',
  styleUrls: ['./list-credenciales.component.css']
})
export class ListCredencialesComponent implements OnInit {


  opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'csv',
        text: 'Exportar CSV',
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


  lista_credenciales = new Array<any>();

  constructor() {
    this.lista_credenciales = [
      {
        contribuyente: 'asdf',
        estatus: 'sadfsadf',
        vigencia: ''
      }
    ]
  }

  ngOnInit() {
    $('#tabla_credenciales').dataTable(this.opcionesDt);
  }

  editarCredencial(identificador_credencial: string) {
    console.log(identificador_credencial);
  }

}
