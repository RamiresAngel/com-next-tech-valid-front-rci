import { Component, OnInit, Input } from '@angular/core';
import { OrdenCompra } from 'src/app/entidades';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CDState } from '../../carga-documentos.reducer';

@Component({
  selector: 'app-header-oc-multiple',
  templateUrl: './header-oc-multiple.component.html',
  styleUrls: ['./header-oc-multiple.component.css']
})
export class HeaderOcMultipleComponent implements OnInit {
  store_ordenes_compra: OrdenCompra[];
  subscripcion: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('CargaDocumentos').subscribe((state: CDState) => {
      this.store_ordenes_compra = state.orden_compra;
    });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
