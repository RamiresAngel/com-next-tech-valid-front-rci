import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-main-usuario-proveedor',
  templateUrl: './main-usuario-proveedor.component.html',
  styleUrls: ['./main-usuario-proveedor.component.css']
})
export class MainUsuarioProveedorComponent implements OnInit {
  vista_carga = '';
  public titulo = 'Usuarios Acreedor';
  constructor(
    private storageService: StorageService
  ) {
    this.vista_carga = this.storageService.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
    if (this.vista_carga === 'carga_doc_no_erp') {
      this.titulo = 'Usuarios Proveedor';
    }
  }

  ngOnInit() {
  }

}
