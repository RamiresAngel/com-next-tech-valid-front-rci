import { Component, OnInit } from '@angular/core';
import { Impuesto, TipoRetencion } from 'src/app/entidades';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { CatalogoTipoRetencionService } from '../catalogo-tipo-retencion.service';
declare var $: any;

@Component({
  selector: 'app-list-tipo-retencion',
  templateUrl: './list-tipo-retencion.component.html',
  styleUrls: ['./list-tipo-retencion.component.css']
})
export class ListTipoRetencionComponent implements OnInit {

  lista = new Array<TipoRetencion>();
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: true,
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
    public _globals: GlobalsComponent,
    private storage: StorageService,
    private tipoRetencionService: CatalogoTipoRetencionService,
    private router: Router
  ) {
    this.identificador_corporativo = this.storage.getDatosIniciales().usuario.identificador_corporativo;
    this.obtenerDatos();
  }

  ngOnInit() {
  }
  obtenerDatos() {
    $('#tabla_tipo_retencion').DataTable().destroy();
    this.tipoRetencionService.obtenerTiposRetencion(this.identificador_corporativo).subscribe((data: Array<TipoRetencion>) => {
      this.lista = data;
      setTimeout(() => {
        $('#tabla_tipo_retencion').DataTable(this.opcionesDt);
      }, 250);
    }, err => {
      if ((err && err.error && err.error.message) || (err && err.message)) {
        console.log(err.error.message || err.message);
      }
      setTimeout(() => {
        $('#tabla_tipo_retencion').DataTable(this.opcionesDt);
      }, 250);
    });
  }

  editar(id) {
    const id_encriptado = this.storage.encriptar_ids(String(id));
    this.router.navigate(['/home/catalogo_tipo_retencion/edit', id_encriptado]);
  }

  onCorporativoSelect(event) {
    if (event.value !== this.identificador_corporativo) {
      this.identificador_corporativo = event.value;
      this.obtenerDatos();
    }
  }

}
