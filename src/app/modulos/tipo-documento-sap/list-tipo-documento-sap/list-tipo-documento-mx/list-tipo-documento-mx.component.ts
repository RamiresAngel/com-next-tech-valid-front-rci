import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { TipoDocumentoSAP } from 'src/app/entidades/Tipo-Documento-SAP';
import { TipoDocumentoSapService } from '../../tipo-documento-sap.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
declare var $: any;

@Component({
  selector: 'app-list-tipo-documento-mx',
  templateUrl: './list-tipo-documento-mx.component.html'
})
export class ListTipoDocumentoMxComponent implements OnInit {

  lista_tipo_documento_sap: TipoDocumentoSAP[];
  identificador_corporativo: string;

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
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
    private _tipoDocumentoSAPService: TipoDocumentoSapService,
    private _router: Router,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.actualizarTabla();
  }
  obtnerDocumentos(data: any) {
    this.lista_tipo_documento_sap = data;
  }
  editarDocuemnto(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/documento_sap/edit/' + String(id)]);
  }

  actualizarTabla() {
    $('#tabla_tipo_documento').DataTable().destroy();
    this._tipoDocumentoSAPService.obtenerTipoDocumentoSAPCorporativo(this.identificador_corporativo)
      .subscribe((data: HttpResponse<TipoDocumentoSAP[]>) => {
        this.obtnerDocumentos(data);
      }, error => {
        console.log(error);
      }, () => {
        setTimeout(() => {
          $('#tabla_tipo_documento').DataTable(this.opcionesDt);
        }, 1000);
      });
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.actualizarTabla();
  }

}
