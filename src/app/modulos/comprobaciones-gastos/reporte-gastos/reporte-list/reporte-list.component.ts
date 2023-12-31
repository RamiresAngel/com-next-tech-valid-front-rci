import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { ComprobacionesGastosService } from 'src/app/modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { BandejaAprobacionService } from 'src/app/modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ComprobacionGastos } from 'src/app/entidades/ComprobacionGastos';



@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.css']
})
export class ReporteListComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @Input() isComprobacion: boolean = true;
  titulo_listar: string = 'Lista';

  TIPO_GASTO: 11 = 11;
  URL_DOCUMENTO: String = 'prestaciones';
  columns = [
    { text: 'Compañía' },
    { text: 'Folio Comprobación' },
    { text: 'Fecha de envío' },
    { text: 'Empleado' },
    { text: 'Centro de Costo' },
    { text: 'Recuperable' },
    { text: 'Motivo' },
    { text: 'Moneda' },
    { text: 'Total Reembolso' },
    { text: 'Jefe Inmediato' },
    { text: 'Estatus' },
    { text: 'Consultar' }
  ]

  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};
  filtro: any;

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _comprobacionService: ComprobacionesGastosService,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private loadingService: LoadingService,
    private router: Router,
  ) {
    this.dtOptions = {
      ...this.globals.dtOptions,
      dom: 'lBfrtip',
      buttons: [
        {
          text: 'Reporte Excel',
          key: '1',
          action: (e, dt, node, config) => {
            this.getReporte();
          }
        }
      ]
    }
  }

  ngOnInit() {
    this._bandejaAprobacionService.setAprobacionData({ nivel_aproacion: null, is_aprobacion: null });
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
      ...this.globals.dtOptions,
      dom: 'lBfrtip',
      buttons: [
        {
          text: 'Reporte Excel',
          key: '1',
          action: (e, dt, node, config) => {
            this.getReporte();
          }
        }
      ]
    }
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  filtrar(filtro) {
    this.loadingService.showLoading();
    this.filtro = filtro;
    this._comprobacionService.getListarReporte(filtro).subscribe((data: any) => {
      this.actualizarTabla();
      this.lista_comprobantes = data.data;
      this.dtTrigger.next();
      this.loadingService.hideLoading();
    }, (err) => {
      this.actualizarTabla();
      this.lista_comprobantes.length = 0;
      this.dtTrigger.next();
      this.loadingService.hideLoading();
    });
  }

  //#region  Auxiliares
  actualizarTabla() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.dtOptions = {
      ...this.globals.dtOptions,
      dom: 'lBfrtip',
      buttons: [
        {
          text: 'Exportar a Excel',
          key: '1',
          action: (e, dt, node, config) => {
            this.getReporte();
          }
        }
      ]
    }
  }
  //#endregion

  eliminar(id: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      text: 'No podrá deshacer esta acción. ',
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._comprobacionService.eliminarComprobacion(id)
          .subscribe((data: any) => {
            Swal.fire({
              title: '¡Éxito!', type: 'success', text: data.data.mensaje ? data.data.mensaje : 'Borrador eliminado con éxito',
            });
            this.filtrar(this.filtro);
          },
            (erro) => {
              console.log(erro);
              Swal.fire({
                title: 'Error', type: 'error',
                text: 'Ha ocurrido un error. <br> Detalle error: ' + erro.error.mensaje,
              });
            });
      }
    });
  }

  base64 = function (s) {
    return window.btoa(decodeURI(decodeURIComponent(s)))
  }

  format = function (s, c) {
    return s.replace(/{(\w+)}/g,
      function (m, p) {
        return c[p];
      })
  }

  getReporte() {
    try {
      this.loadingService.showLoading();
      this._comprobacionService.reporteComprobacionesADM(this.filtro).subscribe((data: any) => {
        let tabla = `<table class="mitable"><thead>
        <tr>
            <th>Compa&ntilde;&iacute;a</th>
            <th>Tipo Gasto</th>
            <th>Folio de <br> comprobaci&oacute;n</th>
            <th>Fecha de Envi&oacute;</th>
            <th>Empleado</th>
            <th>Centro de costos</th>
            <th>Monto reembolsar (MXN)</th>
            <th>Recuperable</th>
            <th>Proveedor</th>
            <th>Concepto</th>
            <th>Motivo</th>
            <th>Destino</th>
            <th>Observaciones</th>
            <th>Nacional / Extranjero</th>
            <th>Tipo de Cambio</th>
            <th>Moneda</th>
            <th>SubTotal <br> Factura </th>
            <th>IVA <br> Factura</th>
            <th>Total <br> Factura</th>
            <th>Total <br> Reembolso (MXN)</th>
            <th>Forma de Pago</th>
            <th>Descripci&oacute;n</th>
            <th>Jefe Inmediato</th>
            <th>Estatus</th>
            <th>Cuenta Contable</th>
        </tr></thead><tbody>`;
        data.data.forEach(item => {
          tabla += `<tr>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.nombre_compania)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.tipo_gasto)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.folio_comprobacion)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.fecha_envio)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.empleado)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.nombre_cc)} </td>`;
          tabla += `<td style="text-align:right"> ${this.omitirAcentos(item.monto_reembolsar)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.recuperable)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.proveedor)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.concepto)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.motivo)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.destino)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.observaciones)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.nacional_extranjero)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.tipo_cambio)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.nombre_moneda)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.subtotal)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.total_impuestos_traslados)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.total_factura)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.total_reembolso)} </td>`;
          tabla += `<td  style="text-align:right"> ${this.omitirAcentos(item.forma_pago)} </td>`; // Forma de Pago
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.descripcion)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.jefe_inmediato)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.estatus)} </td>`;
          tabla += `<td  style="text-align:center"> ${this.omitirAcentos(item.cuenta_contable)} </td>`;
          tabla += `</tr>`;
        });
        tabla += `</tbody></table>`;
        this.expoortarReporte(tabla);
        this.loadingService.hideLoading();
      }, (error) => {
        console.log(error);
        this.loadingService.hideLoading();
      }
      );
    } catch (error) {
      console.log(error);
      this.loadingService.hideLoading();

    }

  }

  omitirAcentos(text) {
    if (text && text !== '') {
      var acentos = `ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç`;
      var original = `AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc`;
      for (var i = 0; i < acentos.length; i++) {
        if (text) {
          text = text.replace(acentos.charAt(i), original.charAt(i));
        } else {
          text = '';
        }

      }
    } else {
      text = "";
    }
    return text;
  }

  expoortarReporte(data) {
    const template =
      `<html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <!--[if gte mso 9]>
                <xml>
                      <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                          <x:ExcelWorksheet>
                              <x:Name>{worksheet}</x:Name>
                              <x:WorksheetOptions>
                              <x:DisplayGridlines/>
                              </x:WorksheetOptions>
                          </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                      </x:ExcelWorkbook>
                </xml>
              <![endif]-->
                <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
          </head>
          <body>
              {table}
          </body>
        </html>`;

    let uri = 'data:application/vnd.ms-excel;base64,'
    let link = document.createElement('a');
    var ctx = {
      worksheet: 'Worksheet', table: data
    }
    const filename = "Reporte_Comprobacion_Gastos";
    link.setAttribute('href', uri + this.base64(this.format(template, ctx)));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }

  editarBorrador(item) {
    console.log(item);
    switch (item.tipo_gasto) {
      case 1: // Gastos de Viaje
        this.URL_DOCUMENTO = 'gastos_viaje';
        break;
      case 2: // Caja Chica
        this.URL_DOCUMENTO = 'caja_chica';
        break;
      case 11: // Prestaciones
        this.URL_DOCUMENTO = 'prestaciones';
        break; // Otros Gastos
      case 12:
        this.URL_DOCUMENTO = 'otros_gastos';
        break;
    }
    const id = this._storageService.encriptar_ids(String(item.folio_comprobacion));
    this.router.navigate([`home/comprobaciones/${this.URL_DOCUMENTO}/edit/${id}/r`]);
  }
}
