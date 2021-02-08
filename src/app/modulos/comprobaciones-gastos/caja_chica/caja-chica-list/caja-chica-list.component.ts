import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caja-chica-list',
  templateUrl: './caja-chica-list.component.html',
  styleUrls: ['./caja-chica-list.component.css']
})
export class CajaChicaListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _comprobacionService: ComprobacionesGastosService,
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
  }
  //#endregion

  eliminar(id) {
    console.log(id);
  }

  editarBorrador(id: string) {
    /* id = this._storageService.encriptar_ids(String(id)); */
    this.router.navigate(['home/comprobaciones/gastos_viaje/add' /* + String(id) */]);
  }
}
