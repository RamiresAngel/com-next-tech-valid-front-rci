import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modulo } from 'src/app/entidades/modulo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { ModuloService } from '../modulo.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
declare var $: any;

@Component({
  selector: 'app-list-modulo-mx',
  templateUrl: './list-modulo-mx.component.html',
  styleUrls: ['./list-modulo-mx.component.css']
})
export class ListModuloMxComponent implements OnInit {

  lista_modulos: Array<Modulo>;
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        customize: function (doc) {
          doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
        },
        exportOptions: { columns: [0, 1, 2, 3, 4] },
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
    public globals: GlobalsComponent,
    private _router: Router,
    private _moduloService: ModuloService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.actualizarModulo();
  }

  actualizarModulo() {
    $('#tabla_modulos').DataTable().destroy();
    this._moduloService.obtenerModuloCF().subscribe((data: any) => {
      this.lista_modulos = data;
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        $('#tabla_modulos').DataTable(this.opcionesDt);
      }, 1000);
    });
  }

  editarModulo(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['/home/modulo/edit', String(id)]);
  }

}
