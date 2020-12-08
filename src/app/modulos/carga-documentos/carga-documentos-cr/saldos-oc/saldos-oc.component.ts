import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { CDState } from '../../carga-documentos.reducer';
import * as CDActions from '../../carga-dcoumentos.actions';
import { OrdenCompra } from 'src/app/entidades';
import { Saldos } from '../../models';


@Component({
  selector: 'app-saldos-oc',
  templateUrl: './saldos-oc.component.html',
  styleUrls: ['./saldos-oc.component.css']
})
export class SaldosOcComponent implements OnInit, OnDestroy {
  saldos: Saldos;
  orden_compra: OrdenCompra;
  subscription: Subscription;

  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.subscription = this.store.select('CargaDocumentos').subscribe((state: CDState) => {
      this.saldos = state.saldos;
      this.orden_compra = state.orden_compra[0];
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CDActions.RemoveSaldos);
    this.subscription.unsubscribe();
  }

}
