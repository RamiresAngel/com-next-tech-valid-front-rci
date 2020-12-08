import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { ListConsultaSaldosMxComponent } from '../list-consulta-saldos-mx/list-consulta-saldos-mx.component';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-list-consulta-saldos',
  templateUrl: './list-consulta-saldos.component.html',
  styleUrls: ['./list-consulta-saldos.component.css']
})
export class ListConsultaSaldosComponent implements OnInit {
  @ViewChild('tablaConsulta') tablaConsulta: ListConsultaSaldosMxComponent;
  filtro_saldos = new FiltroSaldos();
  id_proveedor: string;
  numero_proveedor: string;
  pais: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService

  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((url) => {
      this.id_proveedor = this.storageService.desencriptar_ids(url['id_proveedor']);
      this.numero_proveedor = this.storageService.desencriptar_ids(url['numero_proveedor']);
      console.log(this.numero_proveedor);
      console.log(this.id_proveedor);
    });
    this.pais = 'mx';
  }

  enviarFiltro() {
    this.tablaConsulta.actualizarTabla();
  }
}
