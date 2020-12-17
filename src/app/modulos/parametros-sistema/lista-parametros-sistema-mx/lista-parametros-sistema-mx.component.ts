import { Component, OnInit } from '@angular/core';
import { ParametrosSistemaService } from '../parametros-sistema.service';
import { ParametrosSistema } from 'src/app/entidades/parametros-sistema';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { StorageService } from '../../../compartidos/login/storage.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-lista-parametros-sistema-mx',
  templateUrl: './lista-parametros-sistema-mx.component.html',
  styleUrls: ['./lista-parametros-sistema-mx.component.css']
})
export class ListaParametrosSistemaMxComponent implements OnInit {

  public lista_parametros: Array<ParametrosSistema>;
  public listaCorporativos: any;
  public showCorporativos = false;
  public identificador_corporativo;
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
    private servicio_parametros: ParametrosSistemaService
    , private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
  ) {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    const usuario: any = this._storageService.loadSessionData();
    this.ActualizaLista();
  }

  public updateSucursales() {
  }

  ActualizaLista() {
    $('#tabla_parametros').DataTable().destroy();
    this.servicio_parametros.ObtenerListaParametrosSistemaMXPorCorporativo(this.identificador_corporativo).subscribe(
      (data: any) => {
        this.lista_parametros = data;
      }
      , (error) => {
      }
      , () => {
        setTimeout(() => {
          $('#tabla_parametros').DataTable(this.opcionesDt);
        }, 200);
      }
    );
  }

  editarParametros(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/parametros_sistema/edit/' + String(id)]);
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.ActualizaLista();
  }

}
