import { StorageService } from "./../../compartidos/login/storage.service";
// import { UsuarioSession } from './../usuarios/clases/usuario';
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FiltroFacturasComponent } from "./../../compartidos/filtro-facturas/filtro-facturas.component";
import { Filtro } from "./../../entidades/filtro";
import { MainFacturasModule } from "./../main-facturas/main-facturas.module";
import { FacturaComponent } from "../facturas/factura/factura.component";
import { GlobalsComponent } from "../../compartidos/globals/globals.component";

@Component({
  selector: "app-main-facturas",
  templateUrl: "./main-facturas.component.html",
  styleUrls: ["./main-facturas.component.css"]
})
export class MainFacturasComponent implements OnInit {
  @ViewChild("tablaNotas") tablaNotas: FacturaComponent;
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
    this.filtroConsulta.tipo = "factura";
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
