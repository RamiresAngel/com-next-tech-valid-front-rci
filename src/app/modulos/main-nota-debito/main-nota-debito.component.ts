import { StorageService } from "./../../compartidos/login/storage.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Filtro } from "./../../entidades/filtro";
import { NotasDebitoComponent } from "../notas-debito/notas-debito/notas-debito.component";
import { GlobalsComponent } from "../../compartidos/globals/globals.component";
// import { UsuarioSession } from '../usuarios/clases/usuario';

@Component({
  selector: "app-main-nota-debito",
  templateUrl: "./main-nota-debito.component.html",
  styleUrls: ["./main-nota-debito.component.css"]
})
export class MainNotaDebitoComponent implements OnInit {
  @ViewChild("tablaNotas") tablaNotas: NotasDebitoComponent;
  public filtroConsulta = new Filtro();
  // user = new UsuarioSession();

  constructor(
    private _globales: GlobalsComponent,
    private sessionStr: StorageService
  ) {
    // this.user = this.sessionStr.loadSessionData();
    const rolSucursales = JSON.parse(localStorage.getItem("rolSucursales"));
    if (rolSucursales !== undefined) {
      this._globales.rolSucursales = rolSucursales;
    }
    // [3] // Este CC tiene facturas
    // this.filtroConsulta.corporativo_id = this.user.corporativo_id;
    this.filtroConsulta.tipo = "nota_debito";
    this.filtroConsulta.listtype = "list";
  }

  ngOnInit() {
    setTimeout(() => {
      this.abilitar();
    }, 500);
  }

  abilitar() {
    this.tablaNotas.funcionFacturas();
  }
}
