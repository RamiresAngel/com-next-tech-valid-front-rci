import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-notas-credito-rci',
  templateUrl: './list-notas-credito-rci.component.html',
  styleUrls: ['./list-notas-credito-rci.component.css']
})
export class ListNotasCreditoRciComponent implements OnInit {
  @Input() mostrar_boton;
  /* se cambiara la tabla a modo de sabersi */
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    scrollX: true,
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
  }; dtOptions: DataTables.Settings = {};
  public listaprueba = [];
  constructor() { }

  ngOnInit() {
    this.tabla();
  }

  tabla() {
    this.listaprueba = [
      {
        aprobacion: 1,
        comentario_rechazo: null,
        contribuyente_identificador: null,
        descripcion: '21212121',
        descripcion_solicitud: null,
        destino_solicitud: null,
        detalle: null,
        documento_id: 1331,
        empresa: 'Resort Condominiums International de México S de RL de CV',
        estatus: 0,
        estatus_descripcion: 'Pendiente',
        estatus_sap: 0,
        estatus_sap_descripcion: 'Pendiente de envió',
        fecha_contabilizacion: '2020-12-08T21:56:41.2636892+00:00',
        fecha_creacion: '2020-12-04T00:00:00',
        folio_fiscal: 'EB9E2ECD-784A-45E6-A67F-342333BFD628',
        folio_sap: '',
        hotel: 'Sucursal Matriz CDMX',
        id: 674,
        identificador_corporativo: null,
        libro_caja_id: 0,
        motivo_solicitud: null,
        nombre_proveedor: 'T.C. DISAC, .S.A. DE C.V.',
        numero_acreedor: null,
        numero_anticipo: null,
        ordenes_compra: '21212121',
        proveedor_identificador: null,
        solicitud_anticipo: 0,
        solicitud_anticipo_id: 0,
        subtotal: 9674.75,
        sucursal_identificador: null,
        tipo_gasto: 'FACTURAS PROVEEDOR',
        tipo_gasto_id: 0,
        total: 11222.71,
        usuario_acreedor: 'N/A',
        usuario_identificador: ''
      },
      {
        aprobacion: 1,
        comentario_rechazo: null,
        contribuyente_identificador: null,
        descripcion: '',
        descripcion_solicitud: null,
        destino_solicitud: null,
        detalle: null,
        documento_id: 1310,
        empresa: 'Resort Condominiums International de México S de RL de CV',
        estatus: 0,
        estatus_descripcion: 'Pendiente',
        estatus_sap: 0,
        estatus_sap_descripcion: 'Pendiente de envió',
        fecha_contabilizacion: '2020-12-02T00:00:00',
        fecha_creacion: '2020-12-02T00:00:00',
        folio_fiscal: '7f120160-88d5-45a0-b578-d8e8db60fdcc',
        folio_sap: '',
        hotel: 'Sucursal Matriz CDMX',
        id: 660,
        identificador_corporativo: null,
        libro_caja_id: 0,
        motivo_solicitud: null,
        nombre_proveedor: 'nbombe de emiso',
        numero_acreedor: null,
        numero_anticipo: null,
        ordenes_compra: '30582',
        proveedor_identificador: null,
        solicitud_anticipo: 0,
        solicitud_anticipo_id: 0,
        subtotal: 8228,
        sucursal_identificador: null,
        tipo_gasto: 'FACTURAS PROVEEDOR',
        tipo_gasto_id: 0,
        total: 8228,
        usuario_acreedor: 'Administrador  RCI TEST',
        usuario_identificador: '3c0a141c-74c1-385e-8caf-5e23850aacf8'
      },
      {
        aprobacion: 1,
        comentario_rechazo: null,
        contribuyente_identificador: null,
        descripcion: '',
        descripcion_solicitud: null,
        destino_solicitud: null,
        detalle: null,
        documento_id: 1311,
        empresa: 'Resort Condominiums International de México S de RL de CV',
        estatus: 0,
        estatus_descripcion: 'Pendiente',
        estatus_sap: 0,
        estatus_sap_descripcion: 'Pendiente de envió',
        fecha_contabilizacion: '2020-12-02T00:00:00',
        fecha_creacion: '2020-12-02T00:00:00',
        folio_fiscal: 'f61e2f15-a92b-43ad-9493-5cd949c2bd7e',
        folio_sap: '',
        hotel: 'Sucursal Matriz CDMX',
        id: 661,
        identificador_corporativo: null,
        libro_caja_id: 0,
        motivo_solicitud: null,
        nombre_proveedor: 'nbombe de emiso',
        numero_acreedor: null,
        numero_anticipo: null,
        ordenes_compra: '30582',
        proveedor_identificador: null,
        solicitud_anticipo: 0,
        solicitud_anticipo_id: 0,
        subtotal: 8228,
        sucursal_identificador: null,
        tipo_gasto: 'FACTURAS PROVEEDOR',
        tipo_gasto_id: 0,
        total: 8228,
        usuario_acreedor: 'Administrador  RCI TEST',
        usuario_identificador: '3c0a141c-74c1-385e-8caf-5e23850aacf8',
      },
      {
        aprobacion: 1,
        comentario_rechazo: null,
        contribuyente_identificador: null,
        descripcion: '',
        descripcion_solicitud: null,
        destino_solicitud: null,
        detalle: null,
        documento_id: 1304,
        empresa: 'Resort Condominiums International de México S de RL de CV',
        estatus: 0,
        estatus_descripcion: 'Pendiente',
        estatus_sap: 0,
        estatus_sap_descripcion: 'Pendiente de envió',
        fecha_contabilizacion: '2020-12-01T00:00:00',
        fecha_creacion: '2020-12-01T00:00:00',
        folio_fiscal: 'a4213a81-bd2c-4ff5-98bd-d634c7dde75d',
        folio_sap: '',
        hotel: 'Sucursal Matriz CDMX',
        id: 658,
        identificador_corporativo: null,
        libro_caja_id: 0,
        motivo_solicitud: null,
        nombre_proveedor: 'PROVEEDOR EXTRANJERO',
        numero_acreedor: null,
        numero_anticipo: null,
        ordenes_compra: '30331',
        proveedor_identificador: null,
        solicitud_anticipo: 0,
        solicitud_anticipo_id: 0,
        subtotal: 5500,
        sucursal_identificador: null,
        tipo_gasto: 'FACTURAS PROVEEDOR',
        tipo_gasto_id: 0,
        total: 5500,
        usuario_acreedor: 'PROVEEDOR EXTRANJERO',
        usuario_identificador: '3ff8889f-6f4a-4b95-9b3f-6136df3adb78',
      }
    ];
    setTimeout(() => {
      $('#list_notas_credito').DataTable(this.opcionesDt);
    }, 1000);
  }


}
