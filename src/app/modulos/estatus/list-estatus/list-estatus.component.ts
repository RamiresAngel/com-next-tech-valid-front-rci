import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { EstatusService } from './../estatus.service';
import { Estatus } from './../clases/estatus';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-list-estatus',
  templateUrl: './list-estatus.component.html'
})
export class ListEstatusComponent implements OnInit {

  public estatus: Estatus[];
  public opcionesDt = {
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'portrait',
        exportOptions: { columns: [0, 1] },
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
  constructor(private _servicio: EstatusService, public globals: GlobalsComponent) {
    this.updateList();
  }


  ngOnInit() {

    setTimeout(() => {
      $('#tabla').DataTable(this.opcionesDt);
    }, 500);
  }

  // metodo para refrescar
  public updateList() {
    this._servicio.getEstatusPortal()
      .subscribe((data: HttpResponse<any>) => {
        this.estatus = data.body;
      });
  }
}
