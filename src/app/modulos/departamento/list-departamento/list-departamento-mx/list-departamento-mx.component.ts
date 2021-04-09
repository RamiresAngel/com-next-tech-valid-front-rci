import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../departamento.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpResponse } from '@angular/common/http';
import { Departamento } from 'src/app/entidades/Departamento';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades';
declare var $: any;

@Component({
  selector: 'app-list-departamento-mx',
  templateUrl: './list-departamento-mx.component.html',
  styleUrls: ['./list-departamento-mx.component.css']
})
export class ListDepartamentoMxComponent implements OnInit {

  public listaDepartamentos: any;
  admin_usuario: number;
  identificador_corporativo: string;
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
  corporativo_activo: CorporativoActivo;
  public datos_inciales: DatosIniciales;
  constructor(
    private _departamentoService: DepartamentoService,
    public globals: GlobalsComponent,
    private _router: Router,
    private _storageService: StorageService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
  }

  ngOnInit() {
    const corporatvio_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporatvio_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.actualizarTabla(this.identificador_corporativo);
    }
  }

  actualizarTabla(identificador_corporativo: any = null) {

    $('#tabla_departamentos').DataTable().destroy();
    this._departamentoService.obtenerDepartamentoPorCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: HttpResponse<any>) => {
      this.listaDepartamentos = data;
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        $('#tabla_departamentos').DataTable(this.opcionesDt);
      }, 1000);
    });
  }
  LimpiarTabla() {
    $('#tabla_departamentos').DataTable().destroy();
    this.listaDepartamentos = [];
    setTimeout(() => {
      $('#tabla_departamentos').DataTable(this.opcionesDt);
    }, 1000);
  }

  editarDepartamento(id: any) {
    console.log(id);
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['home/departamento/edit/' + String(id)]);
  }
  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.actualizarTabla(data.value);
    } else {
      this.LimpiarTabla();
    }

  }
}
