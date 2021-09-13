import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-formulario-flujo-aprobacion-pais',
  templateUrl: './formulario-flujo-aprobacion-pais.component.html',
  styleUrls: ['./formulario-flujo-aprobacion-pais.component.css']
})
export class FormularioFlujoAprobacionPaisComponent implements OnInit {


  pais = 'MX';

  constructor(
    private storageService: StorageService
  ) {
    this.pais = this.storageService.getDatosIniciales().usuario.pais;
  }

  ngOnInit() {
  }

}
