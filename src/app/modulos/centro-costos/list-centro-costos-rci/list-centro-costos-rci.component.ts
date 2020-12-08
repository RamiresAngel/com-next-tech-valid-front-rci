import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { CentroCostosService } from '../centro-costos.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades';
declare var $: any;

@Component({
  selector: 'app-list-centro-costos-rci',
  templateUrl: './list-centro-costos-rci.component.html',
  styleUrls: ['./list-centro-costos-rci.component.css']
})
export class ListCentroCostosRciComponent implements OnInit {
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
  public listaCorporativos: any;
  public array_centro_costos: CentroCostos[];
  public showCorporativos = false;
  public identificador_corproativo: string;
  public datos_inciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;

  constructor(
    private _servicio_centro_costos: CentroCostosService,
    private router: Router,
    private _storageService: StorageService,
    public globals: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
  }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corproativo = corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.ActualizaLista(this.identificador_corproativo);
    }
  }

  ActualizaLista(identificador_corporativo: any = null) {
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_sucursales_rci').DataTable().destroy();
    this._servicio_centro_costos.ObtenerListaCentroCostosMXPorCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data: any) => {
        console.log(data);
        this.array_centro_costos = $.map(data, function (obj: any) {
          obj.sucursal_identificador = obj.nombre_sucursal;
          obj.emisor_identificador = obj.emisor;
          obj.nombre = obj.centro_consumo;
          return obj;
        });
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        setTimeout(() => {
          $('#tabla_sucursales_rci').DataTable(this.opcionesDt);
        }, 1000);
      }
    );
  }

  editarCentroCostos(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/centro_costos/edit/' + String(id)]);
  }

  ActualizaCorporativo(data) {
    console.log(data.value);
    if (data.value !== '0') {
      this.ActualizaLista(data.value);
    } else {
      this.LimpiarTabla();
    }

  }

  LimpiarTabla() {
    $('#tabla_sucursales_rci').DataTable().destroy();
    this.array_centro_costos = [];
    setTimeout(() => {
      $('#tabla_sucursales_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

}
