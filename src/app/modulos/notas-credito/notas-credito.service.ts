import { HttpClient2 } from './../../compartidos/servicios_compartidos/http-clien.service';
import { NotasCredito } from './../../entidades/Notas_credito';
import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
@Injectable({
  providedIn: 'root'
})
export class NotasCreditoService {

  constructor(private http: HttpClient2, private globalComponent: GlobalsComponent) {
  }

  public obtenerNotasCredito() {
  }

  public obtenerDocumentosRelacionados(id: any) {
  }

  actualizarCuentaSite(nota_credito: NotasCredito) {
    return this.http.post(`${this.globalComponent.host_documentos}/cuenta_contable`, nota_credito)
  }
}
