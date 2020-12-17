import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CDState } from '../carga-documentos.reducer';
import * as CargaDocumentosAction from '../carga-dcoumentos.actions';

import { DatosIniciales, ItemCodigoRecepcion, CodigoRecepcion, Impuesto, FacturaProveedorRD, OrdenCompraRD, CodigoRecepcionRD, OrdenCompra } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CatalogoImpuestosService } from '../../administracion/catalogo-impuestos/catalogo-impuestos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { CargaDocumentosService } from '../carga-documentos.service';
import { ConceptoCargaDocumentos, Saldos, Totales } from '../models';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BuiltinTypeName } from '@angular/compiler';

@Component({
  selector: 'app-carga-documentos-rd',
  templateUrl: './carga-documentos-rd.component.html',
  styleUrls: ['./carga-documentos-rd.component.css']
})
export class CargaDocumentosRdComponent implements OnDestroy {

  /**
   * Subcripcion al store carga documentos
   */
  subscripcion: Subscription;
  /**
   * Almacena los codigos de recepcion del store
   */
  store_codigos_recepcion: CodigoRecepcionRD[];
  /**
   * Almacena los codigos de recepcion seleccionados
   */
  store_codigos_recepcion_seleccionados: CodigoRecepcionRD[];
  /**
   * Almacena los Conceptos de los cr seleccionados
   */
  store_conceptos: ConceptoCargaDocumentos[];
  /**
   * Almacena Ordenes de compra
   */
  store_orden_compra: OrdenCompra[];
  /**
   * Almacena Totales
   */
  store_totales: Totales;

  // Lista conceptos
  concepto: ConceptoCargaDocumentos[];
  // Codigos de recepcion seleccionados
  codigos_recepcion: CodigoRecepcionRD[];
  // carga_documento: FacturaProveedorRD;
  // Saldos
  saldos: Saldos;

  public datos_iniciales: DatosIniciales;
  public orden_compra: OrdenCompraRD;


  public ordenes_compra = new Array<OrdenCompraRD>();
  public carga_multiple = false;
  public identidicador_coporativo: string;
  public codigos_recepcion_seleccionados = new Array<CodigoRecepcion>();
  public codigo_recepcion_items = new Array<ItemCodigoRecepcion>();
  public impuestos = new Array<Impuesto>();
  public monedas = new Array<Moneda>();
  public carga_documento = new FacturaProveedorRD();

  constructor(
    private store: Store<AppState>,
    private _storageService: StorageService,
    private _impuestosService: CatalogoImpuestosService,
    private _compartidoService: CompartidosService,
    private _cargaService: CargaDocumentosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globals: GlobalsComponent
  ) {
    this.subscripcion = this.store.select('CargaDocumentos').subscribe((CDState: CDState) => {
      this.concepto = CDState.conceptos;
      this.saldos = CDState.saldos;
      this.store_orden_compra = CDState.orden_compra;
      this.store_codigos_recepcion = CDState.codigos_recepcion;
      this.store_codigos_recepcion_seleccionados = CDState.codigos_recepcion_seleccionados;
      this.store_conceptos = CDState.conceptos;
      this.store_totales = CDState.totales;
    });
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identidicador_coporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.obtenerImpuestos();
    this.obtenerMonedas();
  }
  ngOnDestroy(): void {

    this.store.dispatch(new CargaDocumentosAction.ResetCodigoRecepcion());
    this.store.dispatch(new CargaDocumentosAction.ResetConcepto());
    this.store.dispatch(new CargaDocumentosAction.RemoveSaldos());
    this.store.dispatch(new CargaDocumentosAction.RemoveOrdenCompra());
    this.store.dispatch(new CargaDocumentosAction.RemoveSaldos());
    this.store.dispatch(new CargaDocumentosAction.ResetCodigoRecepcionSeleccionado());

    this.subscripcion.unsubscribe();
  }

  async finalizarTransaccion(btn: HTMLButtonElement) {
    const txt_btn = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    const valido = await this.validarDatos();

    if (valido) {
      // Agregamos los Codigos de Recepción que se han seleccionado.
      this.store_codigos_recepcion_seleccionados.forEach(cr => {
        this.carga_documento.id_codigo_recepcion.push(cr.id);
      });
      //  Agregamos los conceptos que se han agregado.
      this.carga_documento.items = this.store_conceptos;
      // Agregar datos de orden compra
      this.carga_documento.proveedor_identificador = String(this.store_orden_compra[0].proveedor_id);
      this.carga_documento.sucursal_identificador = this.store_orden_compra[0].identificador_sucursal;
      this.carga_documento.identificador_contribuyente = this.store_orden_compra[0].identificador_contribuyente;
      this.carga_documento.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
      this.carga_documento.nombre_proveedor = this.store_orden_compra[0].nombre_proveedor;
      this.carga_documento.num_proveedor = this.store_orden_compra[0].num_proveedor;
      this.carga_documento.subtotal = this.store_totales.subtotal;
      this.carga_documento.total_impuestos = this.store_totales.total_impuestos;
      this.carga_documento.total_factura = this.store_totales.total;
      this.carga_documento.tipo_movimiento_doc = 1;
      this.carga_documento.moneda = this.store_orden_compra[0].moneda;
      this.carga_documento.condicion_pago = '';

      this._cargaService.cargaFacturaProveedor(this.carga_documento).subscribe(data => {
        Swal.fire('Exito', 'Factura Cargada Correctamente.', 'success');
        this.router.navigateByUrl('/home/consulta_cfdi');
        btn.disabled = false;
        btn.innerHTML = txt_btn;
      }, err => {
        const mensaje = err.error && err.error.mensaje ? err.error.mensaje : 'Error intentando cargar la factura.';
        console.log(err);
        Swal.fire('Error', mensaje, 'error');
        btn.disabled = false;
        btn.innerHTML = txt_btn;
      });
    } else {
      btn.disabled = false;
      btn.innerHTML = txt_btn;
    }

  }

  validarDatos(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.store_orden_compra.length == 0) {
        this.mostrarAlerta('Error', 'Verifique todos los campos y vuelva a intentarlo.', 'error');
        resolve(false);
        return;
      }
      if (!this.store_totales) {
        this.mostrarAlerta('Error', 'Verifique los impuestos seleccionados.', 'error');
        resolve(false);
        return;
      }
      if (!this.carga_documento.fecha_factura || this.carga_documento.fecha_factura == '') {
        this.mostrarAlerta('Error', 'Seleccione fecha de factura.', 'error');
        resolve(false);
        return;
      }
      if (!this.carga_documento.folio_fiscal || this.carga_documento.folio_fiscal == '') {
        this.mostrarAlerta('Error', 'Ingrese NCF.', 'error');
        resolve(false);
        return;
      }
      this.store_conceptos.forEach(concepto => {
        if (concepto.impuestos.length === 0) {
          this.mostrarAlerta('Error', 'Verifique los impuestos seleccionados.', 'error');
          resolve(false);
          return;
        }
      });
      resolve(true);
    });
  }

  mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success') {
    Swal.fire(titulo, mensaje, tipo);
  }

  onTipoCargaChange(multiple: boolean) {
    this.carga_multiple = multiple;
  }
  onFechaSelected(data) {
    this.carga_documento.fecha_factura = data.formatted;
  }
  onFileChange(data) {
    this.carga_documento.pdf = data.data;
  }

  /**
   *
   * @param orden_compra_response Array de ordenes de compra obtenidos de la peticion
   */
  onloadOrdenCompra(orden_compra_response: OrdenCompraRD[]) {
    // Obtenemos Ordenes de Compra
    // Si la orden de compra tiene mas de un elmento es multiple OC
    if (orden_compra_response.length == 1) {
      this.orden_compra = orden_compra_response[0];
    } else if (orden_compra_response.length > 1) {
      this.ordenes_compra = orden_compra_response;
    }
  }

  /**
   * Agregar un codigo de recepcion seleccionado
   * @param cr código de recepción de la tarjeta seleccionada
   */
  async agregarCodigoRecepcion(cr) {
    this.codigos_recepcion_seleccionados.push(cr);
    const conceptos = await this.obtenerItemCR(cr.id);
    // this.actualizarListaConceptos(conceptos);
    console.log(conceptos);
    this.store.dispatch(new CargaDocumentosAction.AddConcepto(conceptos));

  }

  /**
   * Elimina un código de recepción deseleccionado
   * @param cr código de recepción de la tarjeta seleccionada
   */
  async eliminarCodigoRecepcion(cr) {
    this.codigos_recepcion_seleccionados = this.codigos_recepcion_seleccionados.filter(x => x.id !== cr.id);
    const conceptos = await this.obtenerItemCR(cr.id);
    // this.actualizarListaConceptos(await this.obtenerItemCR(cr.id), true);
    this.store.dispatch(new CargaDocumentosAction.RemoveConcepto(conceptos))
  }

  /**
   * Agrega o elimina elementos del array de conceptos
   *
   * @param items array de items que seran agregados
   * @param eliminar bandera que indica si los items se van a eliminar
   */
  actualizarListaConceptos(items: ItemCodigoRecepcion[], eliminar = false) {
    if (eliminar) {
      items.forEach(x => {
        this.codigo_recepcion_items = this.codigo_recepcion_items.filter(item => item.codigo_recepcion_id !== x.codigo_recepcion_id);
      });
    } else {
      this.codigo_recepcion_items = this.codigo_recepcion_items.concat(items);
      items.forEach(item => {
        const concepto = new ConceptoCargaDocumentos();
        concepto.id = item.id;
        concepto.cantidad = item.cantidad;
        concepto.concepto = item.descripcion_material;
        concepto.importe = item.precio;
        concepto.impuestos = new Array();
        concepto.valor_unitario = item.precio;
      });

      // this.store.dispatch(new CDActions.AddConcepto(items));
    }
  }
  /**
   * Función que retorna los items que le pertenecen a un código de recepción
   *
   * @param id_cr id del codigo de recepcion
   */
  obtenerItemCR(id_cr): Promise<ConceptoCargaDocumentos[]> {
    const promise = new Promise<ConceptoCargaDocumentos[]>((resolve, reject) => {
      this._cargaService.obtenerCodigoRecepcionItem(id_cr).subscribe((codigos_recepcion: ItemCodigoRecepcion[]) => {
        // console.log(codigos_recepcion);

        const codigos = codigos_recepcion.map(co => {
          const nuevo_concepto = new ConceptoCargaDocumentos();
          nuevo_concepto.id = co.codigo_recepcion_id;
          nuevo_concepto.cantidad = co.cantidad_em;
          nuevo_concepto.concepto = co.descripcion_material;
          nuevo_concepto.importe = 0;
          nuevo_concepto.impuestos = [];
          nuevo_concepto.monto_impuesto = 0;
          nuevo_concepto.valor_unitario = co.precio;
          return nuevo_concepto;
        });

        resolve(codigos);
      }, error => {
        resolve([]);
      });
    })
    return promise;
  }

  obtenerImpuestos() {
    this._impuestosService.obtenerImpuestos(this.identidicador_coporativo).subscribe((data: Array<Impuesto>) => {
      this.impuestos = this.globals.agregarSeleccione(this.globals.prepararSelect2(data, 'id', 'descripcion'), 'Seleccionar Impuesto...');
      this.store.dispatch(new CargaDocumentosAction.AddImpuestos(this.impuestos));
    }, err => {
      console.log(err);
      this.impuestos = new Array<Impuesto>();
      this.store.dispatch(new CargaDocumentosAction.AddImpuestos(this.impuestos));
      Swal.fire('Error', 'No se pudieron obtener los impuestos.', 'error');
    });
  }

  obtenerMonedas() {
    this._compartidoService.obtenerMonedasCorporativo(this.identidicador_coporativo).subscribe((monedas: Array<Moneda>) => {
      this.monedas = this.globals.prepararSelect2(monedas, 'id', 'nombre');
    }, err => {
      console.log(err);
    });
  }

  actualizarConcepto(concepto) {
    this.codigo_recepcion_items = this.codigo_recepcion_items.map(item => {
      if (item.id == concepto.id) {
        item = concepto
      }
      return item;
    });
  }
}
