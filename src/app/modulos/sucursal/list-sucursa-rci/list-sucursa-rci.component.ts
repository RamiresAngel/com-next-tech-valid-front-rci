import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../sucursal.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { StorageService } from 'src/app/compartidos/login/storage.service';
declare var $: any;

@Component({
  selector: 'app-list-sucursa-rci',
  templateUrl: './list-sucursa-rci.component.html',
  styleUrls: ['./list-sucursa-rci.component.css']
})
export class ListSucursaRciComponent implements OnInit {
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: true,
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6] },
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
  public array_sucursales: any;
  public listaCorporativos: any;
  public identificador_corproativo;
  public datos_inciales: DatosIniciales;
  public corporativo_activo;

  constructor(
    private _servicio_sucursal: SucursalService,
    private router: Router,
    private _storageService: StorageService,
    public globals: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corproativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
  }
  ngAfterViewInit(): void {
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.ActualizaLista(this.identificador_corproativo);
    }
  }

  ngOnInit() {
  }

  LimpiarTabla() {
    $('#tabla_sucursales_rci').DataTable().destroy();
    this.array_sucursales = [];
    setTimeout(() => {
      $('#tabla_sucursales_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

  ActualizaCorporativo(data) {
    console.log(data.value);
    if (data.value !== '0') {
      this.ActualizaLista(data.value);
    } else {
      this.ActualiarListaAdminNext();
    }
  }

  ActualizaLista(identificador_corporativo: any = null) {
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_sucursales_rci').DataTable().destroy();

    this._servicio_sucursal.ObtenerListaSucursalesMXPorCorporativo(identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , this.corporativo_activo.rol_identificador
    ).subscribe(
      (data) => {
        this.array_sucursales = data;
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

  ActualiarListaAdminNext() {
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_sucursales_rci').DataTable().destroy();
    this._servicio_sucursal.ObtenerListaSucursalesMX().subscribe(
      (data) => {
        this.array_sucursales = data;
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

  EditarSucursal(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/sucursal/edit/' + String(id)]);
  }

}
