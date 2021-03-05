import { Component, OnInit } from '@angular/core';
import { CuentaService } from './../cuenta.service';
import { HttpResponse } from '@angular/common/http';
import { Cuenta } from 'src/app/entidades/Cuenta';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
declare var $: any;

@Component({
  selector: 'app-list-cuenta-rci',
  templateUrl: './list-cuenta-rci.component.html',
  styleUrls: ['./list-cuenta-rci.component.css']
})
export class ListCuentaRciComponent implements OnInit {

  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  listaCuentas: Cuenta[];
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
  public datos_inciales: DatosIniciales;

  constructor(
    private _cuentaService: CuentaService,
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    // this.actualizarTablaCuenta(this.identificador_corporativo);
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.actualizarTablaCuenta(this.identificador_corporativo);
    }
  }

  actualizarTablaCuenta(identificador_corporativo: any = null) {
    $('#tabla_rci').DataTable().destroy();
    this._cuentaService.obtenerCorporativoCuentaRci(identificador_corporativo).subscribe((data: HttpResponse<Cuenta[]>) => {
      // console.log(data);
      this.obtenerCuentas(data);
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        $('#tabla_rci').DataTable(this.opcionesDt);
      }, 1000);
    });
  }

  obtenerCuentas(data: any) {
    this.listaCuentas = data;
  }

  editarCuenta(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/cuenta/edit/' + String(id)]);
  }

  ActualizaCorporativo(data) {
    // console.log(data.value);
    if (data.value !== '0') {
      this.actualizarTablaCuenta(data.value);
    } else {
      // this.actualizarTablaCuenta(this.identificador_corporativo);
      this.LimpiarTabla();
    }
  }

  LimpiarTabla() {
    $('#tabla_rci').DataTable().destroy();
    this.listaCuentas = [];
    setTimeout(() => {
      $('#tabla_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

}
