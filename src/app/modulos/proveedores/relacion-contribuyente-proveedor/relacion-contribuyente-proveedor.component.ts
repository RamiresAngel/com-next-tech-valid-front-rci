import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Contribuyente } from 'src/app/entidades';

@Component({
  selector: 'app-relacion-contribuyente-proveedor',
  templateUrl: './relacion-contribuyente-proveedor.component.html',
  styleUrls: ['./relacion-contribuyente-proveedor.component.css']
})
export class RelacionContribuyenteProveedorComponent implements OnInit {

  identificador_departamento: string;
  public lista_contribuyentes: Contribuyente[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private compartidoService: CompartidosService,
    private storageService: StorageService
  ) {
    this.activatedRoute.params.subscribe(x => {
      this.identificador_departamento = this.storageService.desencriptar_ids(x['id']);
    });
  }

  ngOnInit() {
    this.compartidoService.obtenerContribuyentesProveedorId(this.identificador_departamento).subscribe((data: any) => {
      this.lista_contribuyentes = data;
    });
  }

}
