import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { StorageService } from './../../../compartidos/login/storage.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FacturasService } from '../facturas.service';
import { FiltroFacturasComponent } from './../../../compartidos/filtro-facturas/filtro-facturas.component';
import { Filtro } from './../../../entidades/filtro';
// import { UsuarioSession } from '../../usuarios/clases/usuario';
import { EnviarAcuse, Cliente, FacturaDgt } from '../../../entidades/acuse';
import { ReceptorService } from '../../receptor/receptor.service';
import { EnviarDgtService } from '../../../compartidos/enviarDgt/enviar-dgt.service';
import { HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @ViewChild('filtro') filtro: FiltroFacturasComponent;
  @Input('fff') fff: any;
  @Input() filtroUsuario: Filtro = new Filtro();
  public mostarTabla: boolean;
  public factura: any;
  public doctsRelacionados: any;
  public idFactura: any;
  public alerta: any;
  public disableFactura = false;
  public disableCerarr = false;
  public estatuss = '';
  public acuse = new EnviarAcuse();
  dtOptions: any = {};
  @Input() filtroConsulta;
  public esproveedor = 0;
  // user = new UsuarioSession();

  constructor(
    private _FacturaService: FacturasService,
    private sessionStr: StorageService,
    private globalComponent: GlobalsComponent,
    private _receptorService: ReceptorService,
    private _enviarDgt: EnviarDgtService
  ) {
    // this.user = this.sessionStr.loadSessionData();
  }

  ngOnInit() {
    // this.funcionFacturas();
    this.esproveedor = Number(localStorage.getItem('proveedor'));
  }

  funcionFacturas() {
    const url = '';
    // if (this.user.admin_next === 1) {
    //     url = this.globalComponent.host + '/api/v1/valid/carga_factura/documento/admin/next';
    // } else {
    //     url = this.globalComponent.host + '/api/v1/valid/carga_factura/documento/list';
    // }
    interface External {
      notify: Function;
    }
    const dtColumns = ':visible';
    const columnas: any = this.defineTablas();
    const dataFiltro = this.filtroConsulta;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: {
        url: url,
        type: 'POST',
        contentType: 'application/json',
        // 'headers': { 'Authorization': this.user.token },
        data: function (data) {
          data.filt = dataFiltro;
          data.esAdmin = true;
          data.columns = null;
          data.order = null;
          return JSON.stringify(data);
        },
        dataSrc: function (json) {
          localStorage.setItem('recordsTotal', json.recordsTotal);
          return json.data;
        }
      },
      createdRow: function (row, data, index) {
        const dc_RFC = data.dc_RFC;
        // tslint:disable-next-line:max-line-length
        let link =
          '<a href="https://api.valid.next-technologies.co.cr/api/v1/valid/manage_file/file/pdf/factura/' +
          data.id +
          '" target="_blank" title="PDF"><i class="fa fa-file-pdf"></i></a>';
        // tslint:disable-next-line:max-line-length
        link +=
          '&nbsp; <a href="https://api.valid.next-technologies.co.cr/api/v1/valid/manage_file/file/xml/factura/' +
          data.id +
          '" target="_blank" title="XML"><i class="fa fa-file-code"></i> </a>';
        $('td', row)
          .eq(17)
          .html(link);
        // tslint:disable-next-line:max-line-length
        $('td', row)
          .eq(6)
          .html('');
        $('td', row)
          .eq(6)
          .html(
            '<p style="text-align: right;"><span>¢' +
            data.total_venta +
            ' </span></p>'
          );
        $('td', row)
          .eq(7)
          .html('');
        $('td', row)
          .eq(7)
          .html(
            '<p style="text-align: right;"><span>¢' +
            data.total_comprobante +
            ' </span></p>'
          );
        $('td', row)
          .eq(8)
          .html('');
        $('td', row)
          .eq(8)
          .html(
            '<p style="text-align: right;"><span>¢' +
            data.total_serv_gravado +
            ' </span></p>'
          );
        $('td', row)
          .eq(9)
          .html('');
        $('td', row)
          .eq(9)
          .html(
            '<p style="text-align: right;"><span>¢' +
            data.total_venta_neta +
            ' </span></p>'
          );
      },
      fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // tslint:disable-next-line:max-line-length
        if ($('#esproveedor').val() !== '1') {
          // tslint:disable-next-line:max-line-length
          const s =
            '<button class="btn btn-xs btn-default enviarcorreoFrom" title="Enviar mail"><i class="fa fa-file"></i> </button>';
          $(nRow)
            .find('td:nth-child(0n+12)')
            .html(s);
          $(nRow)
            .find('td:nth-child(0n+12)')
            .on('click', function () {
              $('#acusarFactura').modal(
                { backdrop: 'static', keyboard: false },
                'show'
              );
              $('#fff').val(aData.id);
            });
          // tslint:disable-next-line:max-line-length
          const user =
            '<button class="btn btn-xs btn-default enviarcorreoFrom" title="Enviar mail"><i class="fa fa-file"></i> </button>';
          $(nRow)
            .find('td:first-child')
            .html(user);

          $(nRow)
            .find('td:first-child')
            .on('click', function () {
              $('#acusesFactura').modal(
                { backdrop: 'static', keyboard: false },
                'show'
              );
              $('#fff').val(aData.receptor_id);
              $('#clave').val(aData.clave);
              $('#cedula_emisor').val(aData.cedula_emisor);
              $('#total_comprobante').val(aData.total_comprobante);
              $('#cedula_receptor').val(aData.cedula_receptor);
              $('#numero_consecutivo').val(aData.numero_consecutivo);
              $('#clave_facto').val(aData.CLAVE_FACTO);
              $('#tipo_timbrado').val(aData.tipo_timbrado);
            });
        } else {
          const s = '';
          $(nRow)
            .find('td:nth-child(0n+12)')
            .html(s);
          $(nRow)
            .find('td:nth-child(0n+12)')
            .on('click', function () {
              // $('#acusarFactura').modal({ backdrop: 'static', keyboard: false }, 'show');
              // $('#fff').val(aData.id);
            });
          // tslint:disable-next-line:max-line-length
          const user = '';
          $(nRow)
            .find('td:first-child')
            .html(user);
        }
        // tslint:disable-next-line:max-line-length
      },
      columns: columnas,
      ordering: false,
      lengthChange: true,
      lengthMenu: [10, 25, 50, 75, 100, 200],
      autoWidth: true,
      dom: 'lBrtip',
      fixedHeader: {
        header: true
      },
      scrollY: '500px',
      scrollX: true,
      scrollCollapse: true,
      paging: true,
      oLanguage: {
        // 'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
        sLengthMenu: 'Mostrar _MENU_',
        sZeroRecords: 'No se encontraron resultados',
        sEmptyTable: 'Ningún dato disponible en esta tabla',
        sInfo:
          'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
        sInfoPostFix: '',
        sSearch: 'Buscar:',
        sUrl: '',
        sInfoThousands: '',
        sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
        copy: 'Copiar',
        oPaginate: {
          sFirst: 'Primero',
          sLast: 'Último',
          snext: 'Siguiente',
          sprevious: 'Anterior',
        },
        oAria: {
          sSortAscending:
            ': Activar para ordenar la columna de manera ascendente',
          sSortDescending:
            ': Activar para ordenar la columna de manera descendente'
        }
      },
      responsive: false,
      deferRender: true,

      initComplete: function (settings, json) { },
      buttons: [
        {
          extend: 'copyHtml5',
          text: 'Copiar',
          className: 'btn-sm',
          exportOptions: {
            orientation: 'landscape',
            pageSize: 'LEGAL',
            // tslint:disable-next-line:max-line-length
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16]
          }
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fa fa-file-excel-o"></i> Exportar Excel',
          className: 'btn-sm',
          exportOptions: {
            // tslint:disable-next-line:max-line-length
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16]
          }
        },
        {
          extend: 'pdfHtml5',
          text: 'Exportar PDF',
          className: 'btn-sm',
          title: 'Facto Recepción Costa Rica',
          orientation: 'landscape',
          pageSize: 'TABLOID',
          exportOptions: {
            // tslint:disable-next-line:max-line-length
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16]
          },
          customize: function (doc) {
            doc.defaultStyle.fontSize = 6;
            doc.styles.tableHeader.fontSize = 6;
            // doc.defaultStyle.alignment = 'center'
          }
        }
      ]
    };

    if ($.fn.dataTable.isDataTable('#dataTables-example')) {
      $('#dataTables-example')
        .DataTable()
        .destroy();
    }
    $('#dataTables-example').DataTable(this.dtOptions);
  }

  defineTablas() {
    return [
      { data: null }, // 0
      { data: 'cedula_emisor' }, // 1
      { data: 'razon_social' }, // 2
      { data: 'fecha_emision' }, // 3
      { data: 'clave' }, // 4
      { data: 'tipo' }, // 5
      { data: 'total_venta' }, // 6
      { data: 'total_comprobante' }, // 9
      { data: 'total_serv_gravado' }, // 10
      { data: 'total_venta_neta' }, // 7
      { data: 'codigo_moneda' }, // 8
      { data: null }, // 11
      { data: 'fecha_creacion' },
      { data: 'sucursal' },
      { data: 'centro_consumo' },
      { data: 'estatus_portal' }, // 15
      { data: 'estatus_dgt' },
      { data: null }
    ];
  }

  obtenerDocumentosRelacionados() {
    const folioFiscal = $('#fff').val();
    this._FacturaService
      .obtenerDocumentosRelacionados(folioFiscal)
      .subscribe(data => this.doctsRelacionadosdo(data));
  }

  doctsRelacionadosdo(data: any) {
    this.doctsRelacionados = data;
    if (this.doctsRelacionados.length === 0) {
      this.alerta = 'Esta Factura no cuenta con documentos relacionados';
    } else {
      this.mostarTabla = true;
    }
  }

  cancelarDocumentosRelacionados() {
    this.mostarTabla = false;
    this.alerta = '';
    this.doctsRelacionados = null;
  }

  enviarAcuses() {
    const proveedor = $('#fff').val();
    this.alerta = 'P R O C E S A N D O . . . . . . . ';
    this.disableFactura = true;
    this.disableCerarr = true;
    this._receptorService.getReceptoresId(proveedor).subscribe(
      (response: HttpResponse<any>) => {
        this.obtenerEntidadReceptor(response.body);
      },
      error => alert('Error Receptor ' + error)
    );
  }

  obtenerEntidadProveedor(data: any) {
    data.pcc.forEach(element => {
      // this._centroConsumo
      //   .getCentroConsumoId(element.centro_consumo_id)
      //   .subscribe(
      //     (response: HttpResponse<any>) => {
      //       this.obtenerEntidadCentroConsumo(response.body);
      //     },
      //     error => alert("Error " + error)
      //   );
    });
  }

  obtenerEntidadCentroConsumo(data: any) {
    data.forEach(element => {
      this._receptorService.getReceptoresId(element.receptor_id).subscribe(
        (response: HttpResponse<any>) => {
          this.obtenerEntidadReceptor(response.body);
        },
        error => alert('Error Receptor ' + error)
      );
    });
  }

  obtenerEntidadReceptor(data: any) {
    this.acuse.factura = new FacturaDgt();
    this.acuse.factura.cedula_emisor = $('#cedula_emisor').val();
    this.acuse.factura.total_comprobante = $('#total_comprobante').val();
    this.acuse.factura.respuestaMensaje = this.estatuss;
    this.acuse.factura.cedula_receptor = $('#cedula_receptor').val();
    this.acuse.factura.clave = $('#clave').val();
    this.acuse.factura.serie = $('#numero_consecutivo').val();
    this.acuse.factura.detalleMensaje = 'Envio de factura recepcion acuse';
    this.acuse.factura.tipo_timbrado = $('#tipo_timbrado').val(); // 'TEST';
    this.acuse.factura.clave_facto = $('#clave_facto').val(); // 'FHCRP';
    this.acuse.cliente = new Cliente();
    this.acuse.cliente.key_name = '';
    this.acuse.cliente.password = '';
    this.acuse.cliente.username = '';
    data.forEach(element => {
      this.acuse.cliente.key_name = element.token;
      this.acuse.cliente.username = element.usuario_dgt;
      this.acuse.cliente.password = element.contrasena_dgt;
      this.acuse.factura.receptor_tipo_identificacion =
        element.tipo_identificador;
    });
    this._enviarDgt.enviarAcuse(this.acuse).subscribe(
      (acuse: any) => {
        this.acuseEnviado(acuse);
      },
      error => {
        this.alerta = '';
        this.alerta = 'Ocurrio un error  ' + error.error.mensaje;
        this.disableCerarr = false;
      }
    );
  }

  acuseEnviado(data: any) {
    this.alerta = '';
    this.alerta = data.mensaje;
    this.disableCerarr = false;
  }

  changeEstatus(data: any) {
    this.estatuss = data;
  }

  CancelUpdate() {
    this.alerta = '';
    this.disableFactura = false;
    this.disableCerarr = false;
  }
}
