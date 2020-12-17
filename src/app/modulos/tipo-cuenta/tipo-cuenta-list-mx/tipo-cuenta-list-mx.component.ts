import { Component, OnInit } from '@angular/core';
import { TipoCuenta } from 'src/app/entidades/tipo-cuenta';
import { TipoCuentaService } from '../tipo-cuenta.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
declare var $: any;

@Component({
  selector: 'app-tipo-cuenta-list-mx',
  templateUrl: './tipo-cuenta-list-mx.component.html',
  styleUrls: ['./tipo-cuenta-list-mx.component.css']
})
export class TipoCuentaListMxComponent implements OnInit {
  lista_tipo_cuenta: TipoCuenta[];
  corporativo_activo: CorporativoActivo;
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1] },
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
    private _tipoCuentaService: TipoCuentaService,
    private _storageService: StorageService,
    private _router: Router,
    public globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.cargarDatos();
  }

  cargarDatos() {
    $('#tabla_tipo_cuentas').DataTable().destroy();
    this._tipoCuentaService.obtenerTipoCuentaCorporativoIdentificador(this.identificador_corporativo)
      .subscribe((data: HttpResponse<TipoCuenta[]>) => {
        this.obtenerDatos(data);
      }, error => {

      }, () => {
        setTimeout(() => {

          $('#tabla_tipo_cuentas').DataTable(this.opcionesDt);
        }, 1500);
      });
  }

  obtenerDatos(data: any) {
    this.lista_tipo_cuenta = data;
  }

  editarTipoCuenta(dato) {
    dato = this._storageService.encriptar_ids(String(dato));
    this._router.navigate(['/home/tipo_cuenta/edit/', dato]);
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
      this.cargarDatos();
    } else {
      this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    }
  }

}
