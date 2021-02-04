import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-otros-gastos-list',
  templateUrl: './otros-gastos-list.component.html',
  styleUrls: ['./otros-gastos-list.component.css']
})
export class OtrosGastosListComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _comprobacionService: ComprobacionesGastosService,
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  filtrar(filtro) {
    this._comprobacionService.listarComprobaciones(filtro).subscribe((data: any) => {
      this.actualizarTabla();
      this.lista_comprobantes = data.data;
      this.dtTrigger.next();
    }, (err) => {
      this.actualizarTabla();
      this.lista_comprobantes.length = 0;
      this.dtTrigger.next();
    });
  }

  //#region  Auxiliares
  actualizarTabla() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  //#endregion
}
