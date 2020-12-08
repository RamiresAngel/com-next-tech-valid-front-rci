import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroCfdiRD } from 'src/app/entidades';
import { TablaCfdiRdComponent } from './tabla-cfdi-rd/tabla-cfdi-rd.component';

@Component({
  selector: 'app-listar-cfdi-rd',
  templateUrl: './listar-cfdi-rd.component.html',
  styleUrls: ['./listar-cfdi-rd.component.css']
})
export class ListarCfdiRdComponent implements OnInit {
  @ViewChild('tablaDocumentosRD') tablaDocumentosRD: TablaCfdiRdComponent;
  constructor() { }

  ngOnInit() {
  }

  filtrar(filtro: FiltroCfdiRD) {
    this.tablaDocumentosRD.actualizarTabla(filtro);
  }

}
