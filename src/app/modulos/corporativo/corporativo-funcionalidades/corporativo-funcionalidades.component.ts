import { Funcionalidad, FuncionalidadMin } from './../../../entidades/funcionalidad';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporativoService } from '../corporativo.service';
import { FuncionalidadService } from '../../funcionalidad/funcionalidad.service';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-corporativo-funcionalidades',
  templateUrl: './corporativo-funcionalidades.component.html',
  styleUrls: ['./corporativo-funcionalidades.component.css']
})
export class CorporativoFuncionalidadesComponent implements OnInit {
  @ViewChild('inputFuncionalidad') inputFuncionalidad: HTMLInputElement;
  corporativo_identificador: string;
  lista_funcionalidades: FuncionalidadMin[] = new Array<FuncionalidadMin>();
  lista_funcionalidades_filt: FuncionalidadMin[] = new Array<FuncionalidadMin>();
  cargando: boolean = false;
  titulo = 'Funcionalidades por corporativo';
  public txtBtnAgregar = 'Guardar';
  public opcion_dispponible: string;
  selectedFuncionalidades: any[] = [];
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  relacionRolFun: any[] = [];

  timer: any;

  constructor(
    private activated_route: ActivatedRoute,
    private router: Router,
    private corporativo_service: CorporativoService,
    private storageService: StorageService,
    private funcionalidadService: FuncionalidadService
  ) {
    this.activated_route.params.subscribe(params => {
      this.corporativo_identificador = this.storageService.desencriptar_ids(params['identificador']);
    });
  }

  ngOnInit() {
    this.obtenerFuncionalidades();
    this.obtenerFuncionalidadesCorporativo()
  }

  obtenerFuncionalidadesCorporativo() {
    this.corporativo_service.funcionalidadesCorporativo(this.corporativo_identificador).subscribe((data: Array<any>) => {
      data = data.map(x => { x.id = x.funcionalidad_id; return x });
      this.selectedToRemove = data;
      this.compararFuncionalidades();
    });
  }

  obtenerFuncionalidades() {
    this.funcionalidadService.obtenerFuncionalidadCF().subscribe((data: any) => {
      this.lista_funcionalidades = data;
      this.lista_funcionalidades_filt = this.lista_funcionalidades;
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

  async assigne() {
    this.selectedFuncionalidades = this.selectedFuncionalidades.concat(
      this.selectedToAdd
    );
    this.lista_funcionalidades = this.lista_funcionalidades.filter(item => {
      return this.selectedFuncionalidades.indexOf(item) < 0;
    });

    this.selectedToAdd = [];
    this.ordenarArray();
    this.lista_funcionalidades_filt = await this.filtrar("");
    console.log(this.inputFuncionalidad)
    // this.inputFuncionalidad.nodeValue = "";
  }

  unassigne() {
    this.lista_funcionalidades = this.lista_funcionalidades.concat(this.selectedToRemove);
    this.selectedFuncionalidades = this.selectedFuncionalidades.filter(
      selected => {
        return this.lista_funcionalidades.indexOf(selected) < 0;
      }
    );
    this.selectedToRemove = [];
    this.ordenarArray();
  }
  assigneAll() {
    if (this.lista_funcionalidades.length > 0) {
      this.selectedFuncionalidades = this.selectedFuncionalidades.concat(
        this.lista_funcionalidades
      );
      this.lista_funcionalidades = this.lista_funcionalidades.filter(selected => {
        return this.selectedFuncionalidades.indexOf(selected);
      });
    }
    this.lista_funcionalidades = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.selectedFuncionalidades.length > 0) {
      this.lista_funcionalidades = this.lista_funcionalidades.concat(
        this.selectedFuncionalidades
      );
    }
    this.selectedFuncionalidades = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  compararFuncionalidades() {
    this.selectedFuncionalidades = this.selectedToRemove;
    this.selectedFuncionalidades.forEach(item => {
      for (let index = 0; index < this.lista_funcionalidades.length; index++) {
        if (item.id === this.lista_funcionalidades[index].id) {
          this.lista_funcionalidades.splice(index, 1);
        }
      }
    });
    this.ordenarArray();
  }

  public add() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.corporativo_service.borrarFuncionalidadesCorporativo(this.corporativo_identificador).subscribe(async (data: any) => {
      await this.selectedFuncionalidades.forEach(funcionalidad => {
        this.corporativo_service.agregarFuncionalidadesCorporativo(funcionalidad.id, this.corporativo_identificador).
          subscribe(data => { }, err => console.log(err));
      });
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
      this.router.navigate(['/home/corporativo']);
      this.txtBtnAgregar = 'Guardar';
    }, error => {

    });
  }

  filterFuncionalidad(input: HTMLInputElement) {
    const txt = input.value;
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = setTimeout(async () => {
      input.disabled = true;
      this.lista_funcionalidades_filt = await this.filtrar(txt);
      input.disabled = false;
      input.focus();
    }, 250);
  }

  filtrar(txt: string): Promise<FuncionalidadMin[]> {
    return new Promise((resolve, reject) => {
      if (txt == '') resolve(this.lista_funcionalidades)
      resolve(this.lista_funcionalidades.filter(x => x.target.toLowerCase().includes(txt.toLowerCase())));
    })
  }

  ordenarArray() {
    if (this.lista_funcionalidades.length) {
      this.lista_funcionalidades.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    }
    if (this.selectedFuncionalidades.length) {
      this.selectedFuncionalidades.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    }
  }
}

