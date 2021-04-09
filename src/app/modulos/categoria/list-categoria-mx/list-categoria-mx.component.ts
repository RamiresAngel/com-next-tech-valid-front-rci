import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/entidades/index';
import { StorageService } from 'src/app/compartidos/login/storage.service';
declare var $: any;

@Component({
  selector: 'app-list-categoria-mx',
  templateUrl: './list-categoria-mx.component.html',
  styleUrls: ['./list-categoria-mx.component.css']
})
export class ListCategoriaMxComponent implements OnInit {

  public array_categoria: Array<Categoria>;
  public listarCategorias: any;
  public listaCorporativos: any[];
  public verCategorias = false;
  public pais = 'mx';
  public showCategorias = false;

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        customize: function (doc) {
          doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
        },
        exportOptions: { columns: [0, 1, 2] }
      }
    ],
    oLanguage: {
      sProcessing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      sLengthMenu: 'Mostrar _MENU_',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Ningún dato disponible en esta tabla',
      sInfo:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: '',
      sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
      copy: 'Copiar',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior',
      },
      oAria: {
        sSortAscending:
          ': Activar para ordenar la columna de manera ascendente',
        sSortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  constructor(
    private _servicio_categoria: CategoriaService,
    private router: Router,
    private _storageService: StorageService,
    public globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.pais = 'mx';
    const usuario: any = this._storageService.loadSessionData();
    this.actualizarCategoria(null);
  }

  actualizarCategoria(identificador_corporativo: any = null) {
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_categorias').DataTable().destroy();
    this._servicio_categoria.obtenerListaCategoriaCF().subscribe(
      (data: any) => {
        this.array_categoria = data;
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          $('#tabla_categorias').DataTable(this.opcionesDt);
        }, 1000);
      }
    );
  }

  editarCategoria(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/categoria/edit/' + id]);
  }
}
