import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FlujoAprobacionService } from '../flujo-aprobacion.service';
import swal from 'sweetalert2';
import { DatosIniciales, CorporativoActivo } from 'src/app/entidades';
declare var $: any;

@Component({
  selector: 'app-list-flujo-aprobacion-mx',
  templateUrl: './list-flujo-aprobacion-mx.component.html',
  styleUrls: ['./list-flujo-aprobacion-mx.component.css']
})
export class ListFlujoAprobacionMxComponent implements OnInit {
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
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

  public array_flujos: any;
  public listaCorporativos: any;
  public identificador_corporativo: string;
  public showCorporativos = false;
  datos_inciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;
  constructor(
    private _servicio_flujo: FlujoAprobacionService
    , private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    this.actualizarLista();
  }

  actualizarLista() {
    $('#tabla_flujos').DataTable().destroy();
    this._servicio_flujo.ObtenerListaFlujosMXPorCorporativo(
      this.identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
      ).subscribe(
      (data) => {
        this.array_flujos = data;
        console.log(data);
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        setTimeout(() => {
          $('#tabla_flujos').DataTable(this.opcionesDt);
        }, 500);
      }
    );

  }

  editarFlujo(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/flujo_aprobacion/edit/' + String(id)]);
  }

  actualizaCorporativo( obj: any ) {
    this.identificador_corporativo =  obj.value;
    this.actualizarLista();
  }

}
