import { Component, OnInit } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { ContribuyenteService } from '../contribuyente.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
declare var $: any;
@Component({
  selector: 'app-list-contribuyente-mx',
  templateUrl: './list-contribuyente-mx.component.html',
  styleUrls: ['./list-contribuyente-mx.component.css']
})
export class ListContribuyenteMxComponent implements OnInit {

  public lista_contribuyentes = Array<Contribuyente>();
  public listaCorporativos: any;
  public showCorporativos = false;


  opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: true,
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        pageSize: 'TABLOID',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
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
  public corporativo_activo;
  datos_inciales: DatosIniciales;
  identificador_corporativo: String;
  constructor(
    private _storageService: StorageService,
    private _servicioContribuyentes: ContribuyenteService
    , public router: Router
    , public globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.ActualizaLista(this.identificador_corporativo);
    }
  }
  LimpiarTabla() {
    $('#tabla_contribuyentes').DataTable().destroy();
    this.lista_contribuyentes = [];
    setTimeout(() => {
      $('#tabla_contribuyentes').DataTable(this.opcionesDt);
    }, 1000);
  }


  ActualizaLista(identificador_corporativo: any = null) {
    // Obtenet el identificador corporativo con el que se inicio session
    $('#tabla_contribuyentes').DataTable().destroy();
    console.log(this.datos_inciales.usuario.identificador_usuario);
    console.log(this.corporativo_activo.rol_identificador);
    this._servicioContribuyentes.ObtenerListaContribuyentesMXPorCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , this.corporativo_activo.rol_identificador
    ).subscribe(
      (data: any) => {
        this.lista_contribuyentes = data;
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        setTimeout(() => {
          $('#tabla_contribuyentes').DataTable(this.opcionesDt);
        }, 1000);
      }
    );
  }

  editarContribuyente(id: any): void {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/contribuyente/edit/' + String(id)]);
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.ActualizaLista(data.value);
    } else {
      this.LimpiarTabla();
    }

  }
  ActualiarListaAdminNext() {
    // Obtenet el identificador corporativo con el que se inicio session
    //   $('#tabla_contribuyentes').DataTable().destroy();
    //   this._servicio_sucursal.ObtenerListaSucursalesMX().subscribe(
    //     (data) => {
    //       this.array_sucursales = data;
    //     }
    //     , (error) => {
    //       console.log(error);
    //     }
    //     , () => {
    //       setTimeout(() => {
    //         $('#tabla_contribuyentes').DataTable(this.opcionesDt);
    //       }, 1000);
    //     }
    //   );
  }
}
