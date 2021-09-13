import { Component, OnInit } from '@angular/core';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo, DescuentoProntoPago } from 'src/app/entidades';
import { Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-list-descuento-pronto-pago-mx',
  templateUrl: './list-descuento-pronto-pago-mx.component.html',
  styleUrls: ['./list-descuento-pronto-pago-mx.component.css']
})
export class ListDescuentoProntoPagoMxComponent implements OnInit {

  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  public lista_descuentos: DescuentoProntoPago[];

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
        orientation: 'landscape',
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

  constructor(
    private _descuentoPPService: DescuentoProntoPagoService,
    private _storageService: StorageService,
    private router: Router,
    public globals: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    this.otenerDatos();
  }

  otenerDatos() {
    $('#tabla_dpp').DataTable().destroy();
    this._descuentoPPService.obtenerDecPP(this.identificador_corporativo).subscribe(
      (data: any) => {
        this.lista_descuentos = data;
      }, error => {
        console.log(error);
        if (error.error.mensaje) {
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
        } else {
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error, 'error');
        }
      }, () => {
        setTimeout(() => {
          $('#tabla_dpp').DataTable(this.opcionesDt);
        }, 200);
      }
    );
  }
  editarDPP(identificiador_dpp) {
    const id = this._storageService.encriptar_ids(String(identificiador_dpp));
    this.router.navigate(['home', 'desc_pronto_pago', 'edit', id]);
  }
  cancelarConvocatoria(desc_pp: DescuentoProntoPago, input: any) {
    Swal.fire({
      title: '¿Seguro que desea cancelar esta convocatoria?',
      text: '!Este proceso es irreversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, ¡Cerrar!',
      confirmButtonText: 'Si, ¡Cancelar!'
    }).then((result) => {
      if (result.value) {
        desc_pp.estatus = 3;
        this._descuentoPPService.actualizarDescuentoPP(desc_pp).subscribe(
          (data: any) => {
            Swal.fire(
              '!Completado!',
              'La convocatoria fue cancelada.',
              'success'
            );
            this.router.navigate(['/home/desc_pronto_pago']);
            input.disabled = true;
            input.checked = false;
            desc_pp.estatus = 3;
          }, error => {
            console.log(error);
            Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
          }, () => {
          }
        );
      } else {
        input.selected = true;
      }
    });

  }

  detallesDPP(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/desc_pronto_pago/detalles', String(id)]);
  }
}
