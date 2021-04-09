import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ListAnticiposGeneralMxComponent } from '../list-anticipos-general-mx/list-anticipos-general-mx.component';
import { FiltroSolicitudes } from 'src/app/entidades';

@Component({
  selector: 'app-list-anticipos-general-pais',
  templateUrl: './list-anticipos-general-pais.component.html',
  styleUrls: ['./list-anticipos-general-pais.component.css']
})
export class ListAnticiposGeneralPaisComponent implements OnInit {
  @ViewChild('ListAnticipoGral') ListAnticipoGral: ListAnticiposGeneralMxComponent;
  @Input() mostrar_btn = true;
  public filtro_anticipo = new FiltroSolicitudes();
  public pais = 'mx';

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

  actualizarTabla() {
    console.log(this.filtro_anticipo);
    this.ListAnticipoGral.meterFiltros(null, this.filtro_anticipo);
    this.ListAnticipoGral.actualizarTabla();
  }

}
