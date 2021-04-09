import { DocumentoAddService } from './../documento-add.service';
import { map } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { CorporativoService } from './../../corporativo/corporativo.service';
import { StorageService } from './../../../compartidos/login/storage.service';
import { Usuario } from '../../../entidades/usuario';
import { HttpResponse } from '@angular/common/http';
import { Corporativo } from 'src/app/entidades/corporativo';
@Component({
  selector: 'app-up-main',
  templateUrl: './up-main.component.html'
})
export class UpMainComponent implements OnInit {
  // What to clone
  public corporativos: Corporativo[];
  public lista_corporativos: any;
  public lista_centro_consumo: any;

  public txtvalidaDGT = '';
  @ViewChild('Loadfactura') templateFactura;
  @ViewChild('LoadNotaCredito') templateCredito;
  @ViewChild('LoadNotaDebito') templateDebito;
  @ViewChild('LoadAcuse') templateAcuse;
  // Where to insert the cloned content
  @ViewChild('container', { read: ViewContainerRef }) container;
  public activos = false;
  public idTransaccion = '';
  public contadorAuxiliar = 0;
  public options: Select2Options;
  public startValue: string;
  startValue_proveedores = '';
  startValue_centro_consumo = '';
  public lista_proveeores: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    public globals: GlobalsComponent,
    private _servicio: CorporativoService,
    private _storageService: StorageService,
    private _documentoService: DocumentoAddService,
    private router: Router
  ) {}

  ngOnInit() {
    this.txtvalidaDGT = 'Finalizar Transacci&oacute;n';
    this.generaIdTransaccion();
    // this.obtenerCorporativos();
    this.getListaCorporativos();
    // this.globals.menuDinamico.documentos_CargaDocumentos_Factura = false;
    // this.globals.menuDinamico.documentos_CargaDocumentos_NotaCredito = false;
    // this.globals.menuDinamico.documentos_CargaDocumentos_NotaDebito = false;
    // this.globals.menuDinamico.documentos_CargaDocumentos_Finalizar_Transaccion = false;
  }

  cloneFactura() {
    this.container.createEmbeddedView(this.templateFactura);
    this.deshabilitar();
    ++this.contadorAuxiliar;
  }
  cloneCredito() {
    this.container.createEmbeddedView(this.templateCredito);
    this.deshabilitar();
    ++this.contadorAuxiliar;
  }
  cloneDebito() {
    this.container.createEmbeddedView(this.templateDebito);
    this.deshabilitar();
    ++this.contadorAuxiliar;
  }

  abilitar() {
    this.activos = false;
  }

  habilitarSelects() {
    --this.contadorAuxiliar;
    this.activos = false;
  }

  deshabilitar() {
    this.activos = true;
  }

  generaIdTransaccion() {
    const length = 30;
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    this.idTransaccion = result + Date.now();
  }

  obtenerCorporativos() {
    const usuario: any = <Usuario>this._storageService.loadSessionData();
    // this._servicio.obtenerCorporativos(usuario.usuarioId)
    //   .subscribe((data: HttpResponse<any>) => {
    //     this.corporativos = data.body;
    //   });
  }

  obtenerProveedores(idCorporativo) {
    localStorage.setItem('idCorporativoCar', idCorporativo);
    this.getListaProveedores(idCorporativo);
  }

  obtenerCentroConsumo(idProveedor) {
    localStorage.setItem('idProveedorCar', idProveedor);
  }

  obtenerComponentesFacturas(idCentroConsumo) {
    if (idCentroConsumo !== null && idCentroConsumo.value.toString() !== '0') {
      localStorage.setItem('centroConsumoCar', idCentroConsumo.value);
      // this.globals.menuDinamico.documentos_CargaDocumentos_Factura = true;
      // this.globals.menuDinamico.documentos_CargaDocumentos_NotaCredito = true;
      // this.globals.menuDinamico.documentos_CargaDocumentos_NotaDebito = true;
      // this.globals.menuDinamico.documentos_CargaDocumentos_Finalizar_Transaccion = true;
    } else {
      // this.globals.menuDinamico.documentos_CargaDocumentos_Factura = false;
      // this.globals.menuDinamico.documentos_CargaDocumentos_NotaCredito = false;
      // this.globals.menuDinamico.documentos_CargaDocumentos_NotaDebito = false;
      // this.globals.menuDinamico.documentos_CargaDocumentos_Finalizar_Transaccion = false;
    }
  }

  recuperaIdTransaccion(): string {
    return this.idTransaccion;
  }

  guardarDocumentos() {
    this.txtvalidaDGT =
      '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._documentoService
      .finalizarTransaccion(this.idTransaccion)
      .subscribe((data: HttpResponse<any>) => {
        alert(data.body.mesaje);
        this.txtvalidaDGT = 'Finalizar Transacci&oacute;n';
        this.router.navigate(['/' + localStorage.getItem('flujo') + '/list']);
      });
  }
  function() {
    this.router.navigate(['/home/corporativo']);
  }

  getListaCorporativos() {
    const usuario: any = <Usuario>this._storageService.loadSessionData();
    // this._servicio.obtenerCorporativos(usuario.usuarioId)
    //   .subscribe((data: HttpResponse<any>) => {
    //     this.lista_corporativos = data.body;
    //     this.lista_corporativos = $.map(data.body, function (obj: any) {
    //       obj.id = obj.id;
    //       obj.text = obj.nombre;
    //       return obj;
    //     });
    //     this.lista_corporativos = this.globals.agregarSeleccione(this.lista_corporativos, 'Seleccione Corporativo');
    //     this.startValue = '';
    //     this.options = {
    //       placeholder: 'Seleccione...'
    //     };
    //   });
  }

  getListaProveedores(idCorporativo) {
    localStorage.setItem('idCorporativoCar', idCorporativo);
  }
  selectCorporativo(data: any) {
    localStorage.setItem('idCorporativoCar', data.value);
    this.getListaProveedores(data.value);
  }

  selectProveedor(data: any) {
    this.getListaCentroConsumo(data.value);
  }

  getListaCentroConsumo(idProveedor) {
    localStorage.setItem('idProveedorCar', idProveedor);
  }
  selectCC(data: any) {
    console.log(data);
  }
}
