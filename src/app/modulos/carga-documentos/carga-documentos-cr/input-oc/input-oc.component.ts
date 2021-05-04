import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CargaDocumentosService } from '../../carga-documentos.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as CDActions from '../../carga-dcoumentos.actions';
import { Saldos } from '../../models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-input-oc',
  templateUrl: './input-oc.component.html',
  styleUrls: ['./input-oc.component.css']
})
export class InputOcComponent implements AfterViewInit {
  @Output() onCargaChange = new EventEmitter();
  @Output() onloadOrdenCompra = new EventEmitter();
  @Input() identificador_corporativo = '';
  @ViewChild('btn_validar') btn_validar: ElementRef;
  public carga_multiple = false;
  public lista_oc = new Array<{ identificador_corporativo: String, numero_orden: String }>();
  public input_oc = '';
  public subscripcion: Subscription;
  constructor(
    private _cargaDocumentosService: CargaDocumentosService,
    private _activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngAfterViewInit(): void {
    let oc = '';
    this.subscripcion = this._activatedRoute.params.subscribe(params => {
      oc = params['numero_orden'];
      if (oc) {
        this.input_oc = oc;
        setTimeout(() => {
          this.btn_validar.nativeElement.click();
        }, 100);
      }
    });
  }

  agregarOC() {
    if (this.input_oc.trim()) {
      const orden_compra = {
        identificador_corporativo: this.identificador_corporativo,
        numero_orden: this.input_oc.trim()
      }
      this.lista_oc.push(orden_compra);
    }
    this.input_oc = null;
  }

  async validarOC(btn: HTMLButtonElement) {
    this.toogleLoading(btn, true);
    this.resetValores();

    if (this.carga_multiple) {
      await this.obtenerOCMultiple();
    } else {
      await this.obtenerOCSimple();
    }
    this.toogleLoading(btn, false);
  }
  validarKey(tecla: any) {
    if (this.carga_multiple && (tecla.code === 'Enter' || tecla.code === 'Space')) {
      this.agregarOC();
    } else {
      if (tecla.code === 'Space') {
        this.input_oc = this.input_oc.trim();
      }
    }
  }

  obtenerSaldoSimple(orden_compra_id) {
    this._cargaDocumentosService.obtenerSaldosRD(orden_compra_id).subscribe((data: Array<Saldos>) => {
      this.store.dispatch(new CDActions.AddSaldos(data[0]));
    });
  }

  eliminarOC(oc: string) {
    this.lista_oc = this.lista_oc.filter(x => x.numero_orden !== oc)
  }

  obtenerOCSimple() {
    return new Promise((resolve, reject) => {
      this._cargaDocumentosService.obtenerOrdenCompraRD(this.input_oc).subscribe((data: any) => {
        this.onloadOrdenCompra.emit(data);
        this.store.dispatch(new CDActions.RemoveOrdenCompra());
        this.store.dispatch(new CDActions.ResetCodigoRecepcion());
        this.store.dispatch(new CDActions.AddOrdenCompra(data));
        this.store.dispatch(new CDActions.AddCodigoRecepcion(data[0].codigos_recepcion));

        try {
          this.obtenerSaldoSimple(data[0].id);
        } catch (error) {
          console.log(error);

        }
        resolve();
      }, err => {
        if (err.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: err.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor inténtalo nuevamente más tarde.'
          });
        }
        resolve(err);
      });
    })
  }

  obtenerOCMultiple() {
    return new Promise((resolve, reject) => {
      this._cargaDocumentosService.obtenerOrdenCompraMultipleMX(this.lista_oc).subscribe((data: any) => {
        this.onloadOrdenCompra.emit(data);
        this.store.dispatch(new CDActions.RemoveOrdenCompra());
        this.store.dispatch(new CDActions.ResetCodigoRecepcion());
        this.store.dispatch(new CDActions.AddOrdenCompra(data.ordenes_compra))
        this.store.dispatch(new CDActions.AddCodigoRecepcion(data.codigos_recepcion));
        resolve();
      }, error => {
        if (error.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: error.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor inténtalo nuevamente más tarde.'
          });
        }
        resolve(error);
      });
    });
  }

  toogleLoading(btn_validar: HTMLButtonElement, loading: boolean) {
    if (loading) {
      btn_validar.disabled = true;
      btn_validar.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    } else {
      btn_validar.disabled = false;
      btn_validar.innerHTML = '<em class="fas fa-check"></em>';
    }
  }

  cambiarTipoCarga(multiple) {
    this.resetValores();
    this.carga_multiple = multiple;
    this.lista_oc.length = 0
    this.onCargaChange.emit(multiple);
  }

  resetValores() {
    this.store.dispatch(new CDActions.RemoveOrdenCompra());
    this.store.dispatch(new CDActions.ResetCodigoRecepcion());
    this.store.dispatch(new CDActions.RemoveSaldos());
    this.store.dispatch(new CDActions.ResetConcepto());
    this.store.dispatch(new CDActions.RemoveTotales());
  }

}
