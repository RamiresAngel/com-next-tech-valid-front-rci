import { FiltroComprobacionGVComponent } from './../componentes/filtro-comprobacion/filtro-comprobacion-gv.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

  eliminar(id: number) {
    this._comprobacionService.eliminarComprobacion(id)
      .subscribe(data => {
        // console.log(data);
        Swal.fire({
          title: 'Éxito', type: 'success', text: 'Borrador eliminad con éxito',
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

  editarBorrador(id: string) {
    /* id = this._storageService.encriptar_ids(String(id)); */
    this.router.navigate(['home/comprobaciones/gastos_viaje/add' /* + String(id) */]);
  }
}
