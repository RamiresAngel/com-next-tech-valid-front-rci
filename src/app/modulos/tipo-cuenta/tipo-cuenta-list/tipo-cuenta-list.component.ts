import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app.routing';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-tipo-cuenta-list',
  templateUrl: './tipo-cuenta-list.component.html',
  styleUrls: ['./tipo-cuenta-list.component.css']
})
export class TipoCuentaListComponent implements OnInit {

  pais: string;
  datos_iniciales: DatosIniciales;
  constructor(
    private _storageService: StorageService,
    private globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.pais = this.datos_iniciales.usuario.pais;
  }

}
