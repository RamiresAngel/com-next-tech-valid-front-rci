import { Component, OnInit } from '@angular/core';
import { NivelGasto } from 'src/app/entidades/Nivel-Gasto';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { NivelGastoService } from '../../nivel-gasto.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { StorageService } from 'src/app/compartidos/login/storage.service';
declare var $: any;
@Component({
  selector: 'app-list-nivel-gasto-mx',
  templateUrl: './list-nivel-gasto-mx.component.html'
})
export class ListNivelGastoMxComponent implements OnInit {

  lista_nivel_gasto: NivelGasto[];
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
  identificador_corporativo: string;


  constructor(
    public globals: GlobalsComponent,
    private _nivelGastoService: NivelGastoService,
    private _router: Router,
    private _storageService: StorageService
  ) {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    this.actulaizarTabla();
  }

  actulaizarTabla() {
    $('#tabla_nivel_gasto').DataTable().destroy();
    this._nivelGastoService.obtenerNivelGastoPorCorporativo(this.identificador_corporativo)
      .subscribe((data: HttpResponse<NivelGasto[]>) => {
        this.obtenerListaNivelGasto(data);
      }, error => {
        console.log(error);
      }, () => {
        setTimeout(() => {
          $('#tabla_nivel_gasto').DataTable(this.opcionesDt);
        }, 1000);
      });
  }
  /**
   * Funcion necesaria para obtener data en lista_nivel_gasto
   */
  obtenerListaNivelGasto(data: any) {
    this.lista_nivel_gasto = data;
  }
  editarNivelGasto(identificador: string) {
    identificador = this._storageService.encriptar_ids(identificador);
    this._router.navigate(['home/nivel_gasto/edit/' + String(identificador)]);
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.actulaizarTabla();
  }

}
