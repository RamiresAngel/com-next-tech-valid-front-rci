import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
declare var $: any;
@Component({
  selector: 'app-lista-facturas-aceptadas',
  templateUrl: './lista-facturas-aceptadas.component.html',
  styleUrls: ['./lista-facturas-aceptadas.component.css']
})
export class ListaFacturasAceptadasComponent implements OnInit {

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
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


  id_convocatoria: string;
  lista_facturas: DetallesFacturasDPP[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private _storageService: StorageService,
    private _desceuntoPPService: DescuentoProntoPagoService,
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(id => {
      this.id_convocatoria = this._storageService.desencriptar_ids(id['id']);
      if (this.id_convocatoria) {
        this.obtenerDetalles();
      }
    }
    );
  }
  obtenerDetalles() {
    this._desceuntoPPService.detalleFacturasDPP(this.id_convocatoria).subscribe((data: any) => {
      console.log(data);
      this.lista_facturas = data;
      setTimeout(() => {
        $('#tabla_aceptados').DataTable(this.opcionesDt);
      }, 200);
      // $('#tabla_aceptados').DataTable(this.opcionesDt);
    });
  }

  filtrar() {
    // this.identificador_contribuyente = this.filtro.identificador_contribuyente;
    // this._desceuntoPPService.obtenerLotesFacturas(this.filtro).subscribe((data: any) => {
    //   console.log(data);
    //   this.loteDPP = data;
    //   this.filtro.buscando = false;
    // }, error => {
    //   this.filtro.buscando = false;
    //   if (error.error.mensaje) {
    //     Swal.fire('Atención', 'No hay facturas disponibles para mostrar, intente ampliando el rango de fechas en el filtro.', 'info');
    //     // Swal.fire('Atención', error.error.mensaje, 'error');
    //   } else {
    //     Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, intentalo nuevamente.', 'error');
    //   }
    // });
  }
}

class DetallesFacturasDPP {
  serie: string;
  folio: string;
  rfc_proveedor: string;
  nombre_proveedor: string;
  fecha_factura: string;
  fecha_recepcion: string;
  subtotal: string;
  total_factura: string;
  estado_recepcion: string;
  estado_sat: string;
  version: string;
  tipo_comprobante: string;
  folio_sap: string;
  folio_fiscal: string;
  xml: string;
  pdf: string;
  estado_sap: string;
  contribuyente_rfc: string;
  empresa: string;
  sucursal: string;
  moneda: string;
  proveedor_identificador: string;
  sucursal_identificador: string;
  descuento: string;
  metodo_pago: string;
  forma_pago: string;
  uso_cfdi: string;
  estatus_dpp: string;
  dpp_id: string;
  identificador_lote: string;
}
