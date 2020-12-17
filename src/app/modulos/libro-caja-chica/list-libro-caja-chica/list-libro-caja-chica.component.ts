import { Component, OnInit } from '@angular/core';
import { LibroCajaChicaService } from '../libro-caja-chica.service';
import { Router } from '@angular/router';
import { Libro } from 'src/app/entidades/libro-caja-chica';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-libro-caja-chica',
  templateUrl: './list-libro-caja-chica.component.html',
  styleUrls: ['./list-libro-caja-chica.component.css']
})
export class ListLibroCajaChicaComponent implements OnInit {
  public array_libro: any;
  public lista_libro = Array<Libro>();
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
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
  identificador_corporativo: string;
  constructor(
    private _servicio_libro: LibroCajaChicaService
    , private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
  ) { }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.ActualizarListaByCorporativo();
  }

  ActualizarListaByCorporativo(): void {
    $('#tabla_libro_caja_chica').DataTable().destroy();
    this._servicio_libro.ObtenerByCorporativo(this.identificador_corporativo)
      .subscribe(
        (data: any) => {
          this.array_libro = data;
        }
        , (error) => {
          console.log(error);
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }

        , () => {
          setTimeout(() => {
            $('#tabla_libro_caja_chica').DataTable(this.opcionesDt);
          }, 200);
        }
      );
  }

  // ActualizarLista(): void {
  //   $('#tabla_libro_caja_chica').DataTable().destroy();
  //   this._servicio_libro.ObtenerByCorporativo( this.identificador_corporativo )
  //     .subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         this.array_libro = data;
  //       }
  //       , (error) => {
  //         console.log(error);
  //         swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
  //       }

  //       , () => {
  //         setTimeout(() => {
  //           $('#tabla_libro_caja_chica').DataTable(this.opcionesDt);
  //         }, 1000);
  //       }
  //     );
  // }


  editarLibro(id: any): void {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/libro/edit/' + String(id)]);
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.ActualizarListaByCorporativo();
  }
}
