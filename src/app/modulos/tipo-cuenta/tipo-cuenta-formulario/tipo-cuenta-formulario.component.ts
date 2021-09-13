import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';

@Component({
  selector: 'app-tipo-cuenta-formulario',
  templateUrl: './tipo-cuenta-formulario.component.html',
  styleUrls: ['./tipo-cuenta-formulario.component.css']
})
export class TipoCuentaFormularioComponent implements OnInit {

  pais: string;
  datos_iniciales: DatosIniciales;
  constructor(
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.pais = this.datos_iniciales.usuario.pais;
  }

}
