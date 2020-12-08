import { CorpMin } from './../clases/corp_min';
import { Component, OnInit } from '@angular/core';
import { ReceptorService } from '../receptor.service';
import { HttpResponse } from '@angular/common/http';
import { Receptor } from '../clases/receptor';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { CorporativoService } from '../../corporativo/corporativo.service';
import { StorageService } from '../../../compartidos/login/storage.service';
declare var $: any;

@Component({
  selector: 'app-list-receptor',
  templateUrl: './list-receptor.component.html'
})
export class ListReceptorComponent implements OnInit {
  public receptores: Receptor[];
  public receptor = new Receptor();
  public corporativos: CorpMin[];
  corporativo_id: number;
  public listaCorporativos: any;
  public showCorporativos = false;
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 7, 8] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        pageSize: 'LEGAL',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 7, 8] },
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
  constructor(
    private _servicioReceptor: ReceptorService,
    public globals: GlobalsComponent,
    private _servicioCorporativo: CorporativoService
    , private _storageService: StorageService
  ) {
    this.updateReceptores();
  }

  ngOnInit() {
    const usuario: any = this._storageService.loadSessionData();
    if (usuario.admin_next === 1) {
      this.showCorporativos = true;
      setTimeout(() => {
        // this._servicioCorporativo.obtenerCorporativos('1')
        //   .subscribe((data: HttpResponse<any>) => {
        //     this.listaCorporativos = data.body;
        //   });
      }, 500);
    }
  }

  // metodo para refrescar
  public updateReceptores() {
    this.corporativo_id = 0;
    this._servicioReceptor.getReceptores('0')
      .subscribe((data: HttpResponse<any>) => {
        this.receptores = data.body;
        setTimeout(() => {
          $('#tabla_receptores').DataTable(this.opcionesDt);
        }, 500);
      });
  }

  ActualizaLista(corporativo_id: any) {
    $('#tabla_receptores').DataTable().destroy();
    this._servicioReceptor.getReceptores(corporativo_id)
      .subscribe((data: HttpResponse<any>) => {
        this.receptores = data.body;
        setTimeout(() => {
          $('#tabla_receptores').DataTable(this.opcionesDt);
        }, 500);
      });
  }

}
