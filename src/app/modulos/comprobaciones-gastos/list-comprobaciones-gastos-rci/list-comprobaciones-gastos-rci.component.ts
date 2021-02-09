import { LoadingService } from './../../../compartidos/servicios_compartidos/loading.service';
import { ComprobacionesGastosService } from './../comprobaciones-gastos.service';
import { Subject } from 'rxjs';
import { ComprobacionGastos } from './../../../entidades/ComprobacionGastos';
import { StorageService } from './../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FiltroSolicitudes, } from 'src/app/entidades';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-comprobaciones-gastos-rci',
  templateUrl: './list-comprobaciones-gastos-rci.component.html',
  styleUrls: ['./list-comprobaciones-gastos-rci.component.css']
})
export class ListComprobacionesGastosRciComponent implements OnInit, AfterViewInit {
  /*
  este componente se tienen que modificar para poder
  filtrar por comprobaciones de gastos falta definir el filtro
  por el momento se puso este filtro de notas de crédito
   */
  @Input() mostrar_boton;
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


  aprobar() { }

  rechazar() { }

}
