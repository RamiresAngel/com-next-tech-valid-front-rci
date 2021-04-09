import { Component, OnInit, Input } from '@angular/core';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-formulario-amortizacion-pais',
  templateUrl: './formulario-amortizacion-pais.component.html',
  styleUrls: ['./formulario-amortizacion-pais.component.css']
})
export class FormularioAmortizacionPaisComponent implements OnInit {
  public pais = 'MX';
  public datos_inciales: DatosIniciales;
  constructor(
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.pais = this.datos_inciales.usuario.pais;
  }
}
