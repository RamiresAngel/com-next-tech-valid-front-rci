import { Component, OnInit } from '@angular/core';
import { Funcionalidad } from 'src/app/entidades/funcionalidad';
import { FuncionalidadService } from '../funcionalidad.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-list-funcionalidad-mx',
  templateUrl: './list-funcionalidad-mx.component.html',
  styleUrls: ['./list-funcionalidad-mx.component.css']
})
export class ListFuncionalidadMxComponent implements OnInit {


  lista_funcionalidades: Funcionalidad[];
  identificador_corporativo: string;

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
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
        customize: function (doc) {
          doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
        },
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
    private _funcionalidadService: FuncionalidadService,
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.actualizarTablaCuenta();
  }

  actualizarTablaCuenta() {
    $('#tabla_funcionalidades').DataTable().destroy();
    this._funcionalidadService.obtenerFuncionalidadCF().subscribe((data: HttpResponse<Funcionalidad[]>) => {
      this.obtenerFuncioalidades(data);
    }, error => {
    }, () => {
      setTimeout(() => {
        $('#tabla_funcionalidades').DataTable(this.opcionesDt);
      }, 1000);
    });
  }

  obtenerFuncioalidades(data: any) {
    this.lista_funcionalidades = data;
  }

  editarFuncionalidad(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/funcionalidad/edit/' + String(id)]);
  }

}

