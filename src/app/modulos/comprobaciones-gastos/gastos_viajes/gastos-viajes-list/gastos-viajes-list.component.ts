import { ComprobacionGastos } from './../../../../entidades/ComprobacionGastos';
import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades';
import { Subject } from 'rxjs';
import { ComprobacionesGastosService } from '../../comprobaciones-gastos.service';


@Component({
  selector: 'app-gastos-viajes-list',
  templateUrl: './gastos-viajes-list.component.html',
  styleUrls: ['./gastos-viajes-list.component.css']
})
export class GastosViajesListComponent implements OnInit {

  public usuario: Usuario;
  public identificador_corporativo: string;
  public lista_comprobantes = new Array<ComprobacionGastos>();
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public globals: GlobalsComponent,
    public _storageService: StorageService,
    private _comprobacionService: ComprobacionesGastosService,
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
  }

  ngOnInit() {
  }

  filtrar(filtro) {
    this._comprobacionService.listarComprobaciones(filtro).subscribe((data: any) => {
      this.lista_comprobantes = data.data;
      this.dtTrigger.next();
    }, () => {
      this.lista_comprobantes.length = 0;
    });
  }

}
