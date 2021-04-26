import { Usuario } from './../../../entidades/usuario';
import { BandejaAprobacionService } from './../bandeja-aprobacion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { FiltroComprobacionGVComponent } from '../../comprobaciones-gastos/gastos_viajes/componentes/filtro-comprobacion/filtro-comprobacion-gv.component';
import { ModalComprobanteComponent } from 'src/app/compartidos/comprobacion-components/modal-comprobante/modal-comprobante.component';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { ComprobacionBandejaAprobacion, FiltroComprobacionBandejaAprobacion } from 'src/app/entidades/ComprobacionBandejaAprobacion';

@Component({
  selector: 'app-aprobacion-gastos-viaje',
  templateUrl: './aprobacion-gastos-viaje.component.html',
  styleUrls: ['./aprobacion-gastos-viaje.component.css']
})
export class AprobacionGastosViajeComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @ViewChild(FiltroComprobacionGVComponent) buscar: FiltroComprobacionGVComponent;
  @ViewChild(ModalComprobanteComponent) modal_comprobante: ModalComprobanteComponent;

  public lista_comprobantes = new Array<ComprobacionBandejaAprobacion>();
  public dtTrigger: Subject<any> = new Subject<any>();

  public dtOptions: any = {};
  filtro: FiltroComprobacionBandejaAprobacion;
  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._bandejaAprobacionService.setAprobacionData();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  filtrar(filtro: FiltroComprobacionBandejaAprobacion) {
    // filtro.identificador_aprobador = this._storageService.getDatosIniciales().usuario.identificador_usuario;
    filtro.folio_comprobacion = filtro.folio_comprobacion ? Number(filtro.folio_comprobacion) : 0;
    this.filtro = filtro;
    console.log(this.filtro);
    this.loadingService.showLoading();
    this._bandejaAprobacionService.listarComprobacionesGV(filtro).subscribe((data: any) => {
      this.actualizarTabla();
      this.lista_comprobantes = data.data;
      setTimeout(() => {
        this.dtTrigger.next();
      }, 100);
      this.loadingService.hideLoading();
    }, (err) => {
      this.actualizarTabla();
      this.lista_comprobantes.length = 0;
      setTimeout(() => {
        this.dtTrigger.next();
      }, 100);
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
  editarBorrador(item: ComprobacionBandejaAprobacion) {
    this._bandejaAprobacionService.setAprobacionData({ nivel_aproacion: item.nivel_aprobacion, is_aprobacion: true })
    const id = this._storageService.encriptar_ids(String(item.folio_comprobacion));
    this.router.navigate([`home/comprobaciones/gastos_viaje/aprobacion/${id}`]);
  }


}
