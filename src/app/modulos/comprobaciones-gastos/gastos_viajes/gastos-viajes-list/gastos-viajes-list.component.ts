import { BandejaAprobacionService } from './../../../bandeja-aprobacion/bandeja-aprobacion.service';
import { ModalComprobanteComponent } from './../../../../compartidos/comprobacion-components/modal-comprobante/modal-comprobante.component';
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
    filtro.folio_comprobacion = filtro.folio_comprobacion ? Number(filtro.folio_comprobacion) : null;
    filtro.identificador_usuario = this._storageService.getDatosIniciales().usuario.identificador_usuario;
    this.filtro = filtro;
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._comprobacionService.eliminarComprobacion(id)
          .subscribe(data => {
            // console.log(data);
            Swal.fire({
              title: 'Éxito', type: 'success', text: 'Borrador eliminado con éxito',
            });
            this.buscar.buscar();
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

  getReporte() {
    console.log(this.filtro)
  }
  editarBorrador(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate([`home/comprobaciones/gastos_viaje/edit/${id}`]);
  }
}
