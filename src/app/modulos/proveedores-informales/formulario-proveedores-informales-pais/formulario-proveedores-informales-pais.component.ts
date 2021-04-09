import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-formulario-proveedores-informales-pais',
  templateUrl: './formulario-proveedores-informales-pais.component.html',
  styleUrls: ['./formulario-proveedores-informales-pais.component.css']
})
export class FormularioProveedoresInformalesPaisComponent implements OnInit {

  pais = 'MX';
  constructor(
    private storageService: StorageService
  ) {
    this.pais = this.storageService.getDatosIniciales().usuario.pais;
  }

  ngOnInit() {
  }

}
