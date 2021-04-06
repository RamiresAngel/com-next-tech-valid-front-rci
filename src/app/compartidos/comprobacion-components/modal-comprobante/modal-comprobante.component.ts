import { TipoGastoService } from './../../../modulos/tipo-gasto/tipo-gasto.service';
import { GlobalsComponent } from './../../globals/globals.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from './../../login/storage.service';
import { ComprobacionesGastosService } from './../../../modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { Component, Input, OnInit } from '@angular/core';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { Usuario } from 'src/app/entidades';
import { NonRelativeModuleNameResolutionCache } from 'typescript';
declare var $: any;


@Component({
  selector: 'app-modal-comprobante',
  templateUrl: './modal-comprobante.component.html',
  styleUrls: ['./modal-comprobante.component.css']
})
export class ModalComprobanteComponent implements OnInit {
  public folio_comprobacion: number;
  public show_loading: boolean = false;
  public totales: any = new Object();
  public title: string = 'Aprobar Comprobación';
  public comprobacion_header: ComprobacionGastosHeader = new ComprobacionGastosHeader();
  public numero_comprobacion: number = null;
  public lista_comprobantes: Array<any> = new Array();
  public usuario: Usuario;

  public expandedRow: number;

  tabla: any;
  constructor(
    private _comprobacionService: ComprobacionesGastosService,
    private _storageService: StorageService,
    private _compartidosService: CompartidosService,
    private globals: GlobalsComponent,
    private _tipoGastoService: TipoGastoService
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
  }
  estate = false;
  ngOnInit() {
    this.obtenerComprobacion();
    this.obtenerMonedas();
    $('#modal_comprobante').on('hidden.bs.modal', (e) => {
      console.log('Se cerro el modal');
      this.tabla.destroy();
    })
  }

  setExpand() {

  }

  obtenerComprobacion() {
    this._comprobacionService.obtenerHeaderBorrador(this.folio_comprobacion).subscribe((data: any) => {
      this.comprobacion_header = data.data;
      this.lista_comprobantes = this.comprobacion_header.comprobaciones;
      this.totales = { total_gastado: this.comprobacion_header.total_gastado, monto_reembolsable: this.comprobacion_header.monto_reembolsar };
    }, err => console.log(err));
  }

  toggleModal(folio_comprobacion?: number) {
    console.log(folio_comprobacion);

    if (folio_comprobacion) {
      this.folio_comprobacion = folio_comprobacion;
      this.obtenerComprobacion();
    }
    $('#modal_comprobante').modal('toggle');
  }
  actualizarDatos() {
    console.log('Actualizar Datos')
  }

  obtenerMonedas() {
    this._compartidosService.obtenerMonedasCorporativo(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      let lista_monedas = this.globals.prepararSelect2(data, 'id', 'nombre');
      lista_monedas = this.globals.agregarSeleccione(lista_monedas, 'Seleccione moneda...');
      this._comprobacionService.setcatalogoMonedas(lista_monedas);
    });
  }

  obtenerCuentas() {
    this._tipoGastoService.getlistCuentaAgrupacion('1', this.usuario.identificador_corporativo).subscribe((data: any) => {
      let lista_cuentas = this.globals.prepararSelect2(data, 'id', 'nombre');
      lista_cuentas = this.globals.agregarSeleccione(lista_cuentas, 'Seleccione concepto...');
      this._comprobacionService.setCuentas(lista_cuentas);
    });
  }
}
