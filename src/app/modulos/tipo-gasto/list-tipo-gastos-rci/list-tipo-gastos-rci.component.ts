import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { StorageService } from '../../../compartidos/login/storage.service';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { TipoGastoService } from '../tipo-gasto.service';

@Component({
  selector: 'app-list-tipo-gastos-rci',
  templateUrl: './list-tipo-gastos-rci.component.html',
  styleUrls: ['./list-tipo-gastos-rci.component.css']
})
export class ListTipoGastosRciComponent implements OnInit {

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0] },
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

  public cargando = false;
  public logo_img = './assets/img/NEXT_5.png';
  public lsit_tipo_gastos: any;
  public identificador_corproativo;
  public datos_inciales: DatosIniciales;

  constructor(
    private router: Router,
    private _storageService: StorageService,
    private _tipoGsatoService: TipoGastoService,
    public globals: GlobalsComponent,
  ) {
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
    $('#tabla_tipo_gastos_rci').DataTable().destroy();
    this.lsit_tipo_gastos = [];
    setTimeout(() => {
      $('#tabla_tipo_gastos_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

  ActualizaCorporativo(data) {
    // console.log(data.value);
    if (data.value !== '0') {
      this.identificador_corproativo = data.value;
      this.ActualizaLista();
    } else {
      this.LimpiarTabla();
    }
  }

  ActualizaLista() {
    this.cargando = true;
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_tipo_gastos_rci').DataTable().destroy();
    this._tipoGsatoService.obtenerParametrosTipoGasto(this.identificador_corproativo).subscribe(
      (data) => {
        this.lsit_tipo_gastos = data;
        this.cargando = false;
      }
      , (error) => {
        this.cargando = false;
        console.log(error);
      }
      , () => {
        setTimeout(() => {
          $('#tabla_tipo_gastos_rci').DataTable(this.opcionesDt);
        }, 1000);
      }
    );
  }

  editarRelacionTipoGasto(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    const id_corp = this._storageService.encriptar_ids(String(this.identificador_corproativo));
    this.router.navigate(['/home/tipo_gasto/edit/', String(id), String(id_corp)]);
  }


}
