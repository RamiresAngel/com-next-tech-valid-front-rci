import { BandejaAprobacionService } from './../bandeja-aprobacion.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

import { FiltroComprobacionGVComponent } from '../../comprobaciones-gastos/gastos_viajes/componentes/filtro-comprobacion/filtro-comprobacion-gv.component';
import { ModalComprobanteComponent } from 'src/app/compartidos/comprobacion-components/modal-comprobante/modal-comprobante.component';
import { ComprobacionesGastosService } from '../../comprobaciones-gastos/comprobaciones-gastos.service';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { ComprobacionGastos } from 'src/app/entidades/ComprobacionGastos';

@Component({
  selector: 'app-aprobacion-gastos-viaje',
  templateUrl: './aprobacion-gastos-viaje.component.html',
  styleUrls: ['./aprobacion-gastos-viaje.component.css']
})
export class AprobacionGastosViajeComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @ViewChild(FiltroComprobacionGVComponent) buscar: FiltroComprobacionGVComponent;
  @ViewChild(ModalComprobanteComponent) modal_comprobante: ModalComprobanteComponent;
  @Input() isComprobacion: boolean = true;
  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  filtrar(filtro) {
    this.loadingService.showLoading();
    this._bandejaAprobacionService.listarComprobacionesGV(filtro).subscribe((data: any) => {
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
        // this._comprobacionService.eliminarComprobacion(id)
        //   .subscribe(data => {
        //     // console.log(data);
        //     Swal.fire({
        //       title: 'Éxito', type: 'success', text: 'Borrador eliminado con éxito',
        //     });
        //     this.buscar.buscar();
        //   },
        //     (erro) => {
        //       console.log(erro);
        //       Swal.fire({
        //         title: 'Error', type: 'error',
        //         text: 'Ha ocurrido un error. <br> Detalle error: ' + erro.error.mensaje,
        //       });
        //     });
      }
    });
  }

  editarBorrador(id: string) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate([`home/comprobaciones/gastos_viaje/edit/${id}`]);
  }
}
