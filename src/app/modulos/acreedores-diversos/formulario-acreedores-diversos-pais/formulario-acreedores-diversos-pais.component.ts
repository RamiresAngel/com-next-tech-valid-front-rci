import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';

@Component({
  selector: 'app-formulario-acreedores-diversos-pais',
  templateUrl: './formulario-acreedores-diversos-pais.component.html',
  styleUrls: ['./formulario-acreedores-diversos-pais.component.css']
})
export class FormularioAcreedoresDiversosPaisComponent implements OnInit {

  public pais = 'MX';
  private datos_iniciales: DatosIniciales;
  constructor(
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.pais = this.datos_iniciales.usuario.pais;

  }

  enviarData(obj: any) {
    console.log(obj);
  }

}
