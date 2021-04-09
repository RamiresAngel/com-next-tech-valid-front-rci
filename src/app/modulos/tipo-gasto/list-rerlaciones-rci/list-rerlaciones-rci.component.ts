import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { TipoGastoService } from '../tipo-gasto.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list-rerlaciones-rci',
  templateUrl: './list-rerlaciones-rci.component.html',
  styleUrls: ['./list-rerlaciones-rci.component.css']
})
export class ListRerlacionesRciComponent implements OnInit {

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
        orientation: 'landscape',
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

  public lsit_relacion_gastos: any[];
  public identificador_corproativo;
  public datos_inciales: DatosIniciales;
  id_tipo_gasto: string;
  identificador_corporativo: string;
  cuenta_agrupacion_id: string;
  public cargando = false;
  public logo_img = './assets/img/NEXT_5.png';

  constructor(
    private _storageService: StorageService,
    private _tipoGsatoService: TipoGastoService,
    public globals: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.params.subscribe(id => {
      this.id_tipo_gasto = this._storageService.desencriptar_ids(String(id['id']));
      this.identificador_corporativo = this._storageService.desencriptar_ids(String(id['identificador_corporativo']));
    });
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corproativo = corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
  }

  ngOnInit() {
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.ActualizaLista();
    }
  }

  LimpiarTabla() {
    $('#tabla_relacion_rci').DataTable().destroy();
    this.lsit_relacion_gastos = [];
    setTimeout(() => {
      $('#tabla_relacion_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

  ActualizaLista() {
    this.cargando = true;
    $('#tabla_relacion_rci').DataTable().destroy();
    this._tipoGsatoService.getlistCuentaAgrupacion(this.id_tipo_gasto, this.identificador_corporativo)
      .subscribe((data: any) => {
        // console.log(data);
        this.lsit_relacion_gastos = data;
        this.cargando = false;
      }, error => {
        this.cargando = false;
        console.log(error);
      }, () => {
        setTimeout(() => {
          $('#tabla_relacion_rci').DataTable(this.opcionesDt);
        }, 1000);
      });

  }

  editarRelacionTipoGasto(id: string) {
    this.cuenta_agrupacion_id = id;
    this.Modal();
  }

  creaRelacionTipoGasto() {
    this.cuenta_agrupacion_id = null;
    this.Modal();
  }

  public Modal() {
    $('#ModalFormularoRci').modal('show');
  }

  public limpiaIdAgrupacion() {
    this.cuenta_agrupacion_id = '';
  }

}
