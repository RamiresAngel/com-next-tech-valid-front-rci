import { Component, OnInit } from '@angular/core';
import { CorporativoService } from '../corporativo.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { Usuario } from '../../../entidades/usuario';
import { Corporativo } from 'src/app/entidades/corporativo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
declare var $: any;


@Component({
  selector: 'app-list-corporativo',
  templateUrl: './list-corporativo.component.html'
})
export class ListCorporativoComponent implements OnInit {
  public lista_corporativos: Corporativo[];
  public corporativo = new Corporativo();
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
  };
  constructor(
    private _servicioCorporativo: CorporativoService,
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private router: Router,
  ) { }


  async ngOnInit() {
    this.updateCorporativos();
  }

  public updateCorporativos() {
    $('#tabla_corporativos').DataTable().destroy();
    this._servicioCorporativo.obtenerCorporativos().subscribe((data: HttpResponse<Corporativo>) => {
      this.obtenerCorporativos(data);
    }, error => {
    }, () => {
      setTimeout(() => {
        $('#tabla_corporativos').DataTable(this.opcionesDt);
      }, 1000);
    });
  }

  obtenerCorporativos(data: any) {
    this.lista_corporativos = data;
  }
  editarCorporativo(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/corporativo/edit/' + String(id)]);
  }

  agregarFuncionalidades(id_corporativo) {
    id_corporativo = this._storageService.encriptar_ids(String(id_corporativo));
    this.router.navigate(['/home/corporativo/funcionalidades/' + String(id_corporativo)]);
  }

  agregarMoneda(id_corporativo) {
    id_corporativo = this._storageService.encriptar_ids(String(id_corporativo));
    this.router.navigate(['/home/corporativo/monedas/' + String(id_corporativo)]);
  }
}
