import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FiltroDpp } from 'src/app/entidades/filtro-dpp';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
import { LoteDPP } from 'src/app/entidades';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-lista-codigos-mx',
  templateUrl: './lista-codigos.component-mx.html',
  styleUrls: ['./lista-codigos.component-mx.css']
})
export class ListaCodigosMxComponent implements OnInit {

  public filtro = new FiltroDpp();
  public loteDPP = new LoteDPP();
  public identificador_contribuyente: string;
  txt_btn_validar = 'Validar';
  public txt_btn_cargar = '<i class="fas fa-upload"></i> Cargar';
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    columns: {
      autoWidth: true
    },
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
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
    private router: Router,
    private _storageService: StorageService,
    private _desceuntoPPService: DescuentoProntoPagoService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      $('#tabla_codigos').DataTable(this.opcionesDt);
    }, 100);
  }

  cargarDocumento(dpp_id: any) {
    dpp_id = this._storageService.encriptar_ids(String(dpp_id));
    const id_suc = this._storageService.encriptar_ids(String(this.identificador_contribuyente));
    this.router.navigateByUrl(`/home/desc_pronto_pago/carga_nc/${dpp_id}/${id_suc}`);
  }

  filtrar() {
    this.identificador_contribuyente = this.filtro.identificador_contribuyente;
    this._desceuntoPPService.obtenerLotesFacturas(this.filtro).subscribe((data: any) => {
      console.log(data);
      this.loteDPP = data;
      this.filtro.buscando = false;
    }, error => {
      this.filtro.buscando = false;
      if (error.error.mensaje) {
        Swal.fire('Atención', 'No hay facturas disponibles para mostrar, intente ampliando el rango de fechas en el filtro.', 'info');
        // Swal.fire('Atención', error.error.mensaje, 'error');
      } else {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, intentalo nuevamente.', 'error');
      }
    });
  }
}
