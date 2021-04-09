import { FiltroComprobacionOtrosGastosComponent } from './../components/filtro-comprobacion-otros-gastos/filtro-comprobacion-otros-gastos.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-otros-gastos-list',
  templateUrl: './otros-gastos-list.component.html',
  styleUrls: ['./otros-gastos-list.component.css']
})
export class OtrosGastosListComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  @ViewChild(FiltroComprobacionOtrosGastosComponent) buscar: FiltroComprobacionOtrosGastosComponent;

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
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      text: 'No podrá deshacer esta acción. ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
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
    });
  }

  editarBorrador(id: string) {
    /* id = this._storageService.encriptar_ids(String(id)); */
    this.router.navigate(['home/comprobaciones/otros_gastos/add' /* + String(id) */]);
  }
}
