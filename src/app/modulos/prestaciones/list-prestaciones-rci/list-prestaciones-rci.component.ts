import { PrestacionesService } from './../prestaciones.service';
import { Component, OnInit } from '@angular/core';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { Prestaciones } from 'src/app/entidades';
declare var $: any;

@Component({
  selector: 'app-list-prestaciones-rci',
  templateUrl: './list-prestaciones-rci.component.html',
  styleUrls: ['./list-prestaciones-rci.component.css']
})
export class ListPrestacionesRciComponent implements OnInit {

  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  public listaPrestacion: Prestaciones[];
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: false,
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
  public datos_inciales: DatosIniciales;

  constructor(
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private _router: Router,
    public _servicePrestacion: PrestacionesService
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.actualizarTablaprestacion(this.identificador_corporativo);
    }
  }

  actualizarTablaprestacion(identificador_corporativo: any) {
    $('#tabla_prestacion_rci').DataTable().destroy();
    this._servicePrestacion.getListPrestaciones(identificador_corporativo)
      .subscribe((data: any) => {
        this.listaPrestacion = data;
      }, error => {
        console.log(error);
      }, () => {
        setTimeout(() => {
          $('#tabla_prestacion_rci').DataTable(this.opcionesDt);
        }, 1000);
      });
  }

  editarPrestacion(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/prestaciones/edit/' + String(id)]);
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.actualizarTablaprestacion(data.value);
    } else {
      this.LimpiarTabla();
    }
  }

  LimpiarTabla() {
    $('#tabla_prestacion_rci').DataTable().destroy();
    // this.listaPrestacion = [];
    setTimeout(() => {
      $('#tabla_prestacion_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

}
