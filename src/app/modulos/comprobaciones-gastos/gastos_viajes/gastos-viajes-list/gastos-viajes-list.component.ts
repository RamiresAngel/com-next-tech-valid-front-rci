import { BandejaAprobacionService } from './../../../bandeja-aprobacion/bandeja-aprobacion.service';
import { FiltroComprobacionGVComponent } from './../componentes/filtro-comprobacion/filtro-comprobacion-gv.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Subject } from 'rxjs';
import { ComprobacionesGastosService } from '../../comprobaciones-gastos.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastos-viajes-list',
  templateUrl: './gastos-viajes-list.component.html',
  styleUrls: ['./gastos-viajes-list.component.css']
})
export class GastosViajesListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @ViewChild(FiltroComprobacionGVComponent) buscar: FiltroComprobacionGVComponent;
  @Input() isComprobacion: boolean = true;
  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};
  filtro: any;
  TIPO_GASTO: 1 = 1;

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
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn-sm',
          exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
        }
      ]
      // buttons: [
      //   {
      //     text: 'Reporte Excel',
      //     key: '1',
      //     action: (e, dt, node, config) => {
      //       this.getReporte();
      //     }
      //   }
      // ]
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
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn-sm',
          exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
        }
      ]
      // buttons: [
      //   {
      //     text: 'Reporte Excel',
      //     key: '1',
      //     action: (e, dt, node, config) => {
      //       this.getReporte();
      //     }
      //   }
      // ]
    }
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  filtrar(filtro) {
    this.loadingService.showLoading();
    filtro.folio_comprobacion = filtro.folio_comprobacion ? Number(filtro.folio_comprobacion) : null;
    this.filtro = filtro;
    this.filtro.tipo_gasto = this.TIPO_GASTO;
    this._comprobacionService.listarComprobaciones(filtro).subscribe((data: any) => {
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
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn-sm',
          exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
        }
      ]
      // buttons: [
      //   {
      //     text: 'Exportar a Excel',
      //     key: '1',
      //     action: (e, dt, node, config) => {
      //       this.getReporte();
      //     }
      //   }
      // ]
    }
  }
  //#endregion

  eliminar(id: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      text: 'No podrá deshacer esta acción. ',
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._comprobacionService.eliminarComprobacion(id)
          .subscribe((data: any) => {
            // console.log(data);
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
    this._comprobacionService.reporteComprobaciones(this.filtro).subscribe((data: any) => {
      let tabla = `<table class="mitable"><thead>
      <tr>
          <th>Compa&ntilde;&iacute;a</th>
          <th>Tipo Gasto</th>
          <th>Folio de comprobaci&oacute;n</th>
          <th>Fecha de Envi&oacute;</th>
          <th>Empleado</th>
          <th>Centro de costos</th>
          <th>Monto reembolsar</th>
          <th>Recuperable</th>
          <th>Proveedor</th>
          <th>Concepto</th>
          <th>Motivo</th>
          <th>Destino</th>
          <th>Observaciones</th>
          <th>Nacional / Extranjero</th>
          <th>Tipo de Cambio</th>
          <th>Moneda</th>
          <th>Sub Total</th>
          <th>Impuestos</th>
          <th>Total</th>
          <th>Total Reembolso</th>
          <th>Descripci&oacute;n</th>
          <th>Jefe Inmediato</th>
          <th>Estatus</th>
          <th>Cuenta Contable</th>
      </tr></thead><tbody>`;
      data.data.forEach(item => {
        tabla += `<tr>`;
        tabla += `<td> ${this.omitirAcentos(item.nombre_compania)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.tipo_gasto)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.folio_comprobacion)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.fecha_envio)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.empleado)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.nombre_cc)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.monto_reembolsar)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.recuperable)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.proveedor)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.concepto)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.motivo)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.destino)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.observaciones)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.nacional_extranjero)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.tipo_cambio)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.nombre_moneda)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.subtotal)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.total_impuestos_traslados)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.total_factura)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.total_reembolso)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.descripcion)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.jefe_inmediato)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.estatus)} </td>`;
        tabla += `<td> ${this.omitirAcentos(item.cuenta_contable)} </td>`;
        tabla += `</tr>`;
      });
      tabla += `</tbody></table>`;
      this.expoortarReporte(tabla);
    });
  }

  omitirAcentos(text) {
    console.log(text);
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
    console.log(data);
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

  editarBorrador(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate([`home/comprobaciones/gastos_viaje/edit/${id}`]);
  }
}
