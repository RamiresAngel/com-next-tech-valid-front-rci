import { Component, Input, OnDestroy } from '@angular/core';
import { OrdenCompra } from 'src/app/entidades';
import { Store } from '@ngrx/store';
import { CDState } from '../../carga-documentos.reducer';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-header-oc-simple',
  templateUrl: './header-oc-simple.component.html',
  styleUrls: ['./header-oc-simple.component.css']
})
export class HeaderOcSimpleComponent implements OnDestroy {
  orden_compra = new OrdenCompra();
  stateSubscription: Subscription;
  constructor(private store: Store<AppState>) {
    this.stateSubscription = this.store.select('CargaDocumentos').subscribe((cd_state: CDState) => {
      this.orden_compra = cd_state.orden_compra[0];
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  public abrirDetalleOC(): void {
    $('#modal-oc').modal('toggle');
  }
  public abrirDocsRelacioandos(): void {
    $('#modal-docs-rel').modal('toggle');
  }
}
