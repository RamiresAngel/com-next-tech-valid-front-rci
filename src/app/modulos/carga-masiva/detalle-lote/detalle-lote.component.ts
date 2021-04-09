import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CargaMasivaService } from '../carga-masiva.service';

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.css']
})
export class DetalleLoteComponent implements OnInit {

  lista_validaciones = new Array<any>();
  numero_lote: string;
  cargando: boolean;

  constructor(
    private activatedRute: ActivatedRoute,
    private storageService: StorageService,
    private cargaMasivaService: CargaMasivaService
  ) {
    this.activatedRute.params.subscribe(x => {
      this.numero_lote = this.storageService.desencriptar_ids(x['numero_lote']);
    });
  }


  ngOnInit() {
    this.obtenerDetallesLote();
  }
  obtenerDetallesLote() {
    this.cargando = true;
    this.cargaMasivaService.obtenerValidacionLote(this.numero_lote).subscribe((data: any) => {
      this.lista_validaciones = data;
      this.cargando = false;
    });
  }

}
