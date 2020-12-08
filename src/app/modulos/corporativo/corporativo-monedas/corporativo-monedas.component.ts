import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporativoService } from '../corporativo.service';
import { FuncionalidadService } from '../../funcionalidad/funcionalidad.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';


@Component({
  selector: 'app-corporativo-monedas',
  templateUrl: './corporativo-monedas.component.html',
  styleUrls: ['./corporativo-monedas.component.css']
})
export class CorporativoMonedasComponent implements OnInit {
  corporativo_identificador: string;
  lista_monedas = [];
  cargando: boolean = false;
  titulo = 'Monedas por corporativo';
  public txtBtnAgregar = 'Guardar';
  public opcion_dispponible: string;
  selectedMonedas: any[] = [];
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  relacionRolFun: any[] = [];

  constructor(
    private activated_route: ActivatedRoute,
    private router: Router,
    private corporativo_service: CorporativoService,
    private storageService: StorageService,
    private compartidoService: CompartidosService
  ) {
    this.activated_route.params.subscribe(params => {
      this.corporativo_identificador = this.storageService.desencriptar_ids(params['identificador']);
    });
  }

  ngOnInit() {
    this.obtenerMonedas();
    this.obtenerMonedasCorporativo()
  }

  obtenerMonedasCorporativo() {
    this.compartidoService.obtenerMonedasCorporativo(this.corporativo_identificador).subscribe((data: Array<any>) => {
      data = data.map(x => { x.id = x.id; return x });
      this.selectedToRemove = data;
      if (this.lista_monedas.length != 0) {
        this.compararMoneda();
      }
    });
  }

  obtenerMonedas() {
    this.compartidoService.obtenerMonedas().subscribe((data: any) => {
      this.lista_monedas = data;
      if (this.selectedToRemove.length !== 0) {
        this.compararMoneda();
      }
      this.ordenarArray();
    }, error => {
      console.log(error);
    });
  }

  chosenFuncionalidad(items) {
    this.selectedToAdd = items;
  }

  chosenFuncionalidadToRemove(items) {
    this.selectedToRemove = items;
  }

  assigne() {
    this.selectedMonedas = this.selectedMonedas.concat(
      this.selectedToAdd
    );
    this.lista_monedas = this.lista_monedas.filter(item => {
      return this.selectedMonedas.indexOf(item) < 0;
    });

    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigne() {
    this.lista_monedas = this.lista_monedas.concat(this.selectedToRemove);
    this.selectedMonedas = this.selectedMonedas.filter(
      selected => {
        return this.lista_monedas.indexOf(selected) < 0;
      }
    );
    this.selectedToRemove = [];
    this.ordenarArray();
  }
  assigneAll() {
    if (this.lista_monedas.length > 0) {
      this.selectedMonedas = this.selectedMonedas.concat(
        this.lista_monedas
      );
      this.lista_monedas = this.lista_monedas.filter(selected => {
        return this.selectedMonedas.indexOf(selected);
      });
    }
    this.lista_monedas = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.selectedMonedas.length > 0) {
      this.lista_monedas = this.lista_monedas.concat(
        this.selectedMonedas
      );
    }
    this.selectedMonedas = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  compararMoneda() {
    this.selectedMonedas = this.selectedToRemove;
    this.selectedMonedas.forEach(moneda_seleccionada => {
      this.lista_monedas = this.lista_monedas.filter(moneda => moneda.clave !== moneda_seleccionada.clave)
    });
    this.ordenarArray();
  }

  public add(btn: HTMLButtonElement) {
    const txt = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    btn.disabled = true;
    console.log(this.selectedMonedas);
    const relacion = this.selectedMonedas.map(x => {
      return { moneda_id: x.id, identificador_corporativo: this.corporativo_identificador }
    });
    console.log(relacion);
    this.compartidoService.crearRelacionCorporativoMoneda(relacion).subscribe((data: any) => {
      console.log(data);
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
      this.router.navigate(['/home/corporativo']);
      btn.innerHTML = txt;
      btn.disabled = false;
    }, err => {
      console.log(err);
      btn.innerHTML = txt;
      btn.disabled = false;
      Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + err.error.error.message, 'error');
    })

    // this.router.navigate(['/home/corporativo']);
    this.txtBtnAgregar = 'Guardar';
  }


  ordenarArray() {
    if (this.lista_monedas.length) {
      this.lista_monedas.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    }
    if (this.selectedMonedas.length) {
      this.selectedMonedas.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    }
  }
}
