import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { ComprobacionBandejaAprobacion, FiltroComprobacionBandejaAprobacion } from 'src/app/entidades/ComprobacionBandejaAprobacion';
import { BandejaAprobacionService } from '../bandeja-aprobacion.service';

@Component({
  selector: 'app-aprobacion-caja-chica',
  templateUrl: './aprobacion-caja-chica.component.html',
  styleUrls: ['./aprobacion-caja-chica.component.css']
})
export class AprobacionCajaChicaComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  columns = [
    { type: 'text', text: 'Estatus', resp_node: 'estatus' },
    { type: 'text', text: 'Folio Comprobación', resp_node: 'folio_comprobacion' },
    { type: 'text', text: 'Usuario', resp_node: 'nombre_usuario' },
    { type: 'text', text: 'Motivo', resp_node: 'motivo' },
    { type: 'date', text: 'Fecha Creación', resp_node: 'fecha_creacion' },
    { type: 'currency', text: 'Monto Reembolsar', resp_node: 'monto_reembolsar' },
    { type: 'text', text: 'Moneda', resp_node: 'nombre_moneda' },
    { type: 'text', text: 'Centro Costo', resp_node: 'nombre_cc' },
    { type: 'text', text: 'Compañía', resp_node: 'nombre_compania' },
    { type: '', text: 'Acciónes ', resp_node: '' },
  ];

  public lista_comprobantes = new Array<ComprobacionBandejaAprobacion>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};

  filtro: FiltroComprobacionBandejaAprobacion;
  TIPO_GASTOS: 2 = 2;

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
    filtro.identificador_aprobador = this._storageService.getDatosIniciales().usuario.identificador_usuario;
    filtro.folio_comprobacion = filtro.folio_comprobacion ? Number(filtro.folio_comprobacion) : 0;
    this.filtro = filtro;
    this.loadingService.showLoading();
    filtro.tipo_gasto = this.TIPO_GASTOS;
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
    this.router.navigate([`home/comprobaciones/caja_chica/edit/${id}`]);
  }


}
