import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { Rol } from 'src/app/entidades/rol';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import { RolService } from '../../rol/rol.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ConsultaSaldosService } from '../../consulta-saldos/consulta-saldos.service';
import { Usuario } from 'src/app/entidades';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { filter } from 'rxjs/operators';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
declare var $: any;

@Component({
  selector: 'app-modal-roles-cc',
  templateUrl: './modal-roles-cc.component.html',
  styleUrls: ['./modal-roles-cc.component.css']
})
export class ModalRolesCcComponent implements OnInit {
  @Output() enviarDatos = new EventEmitter();
  @Input() lista_relaciones: any;
  @Input() lista_centro_costos: any[];
  @Input() lista_centro_costos_filtrar: any[];
  @Output() filtrar = new EventEmitter();
  @Input() lista_roles: any[];
  @Input() private saludar: EventEmitter<any>;
  // @Input() private mapearRelaciones: EventEmitter<any>;

  centros_costos_seleccionados: any;
  // lista_centro_costos: CentroCostos[];
  roles_seleccionados: any;
  // lista_roles: Rol[];
  relacion: any;
  filtroBusqueda = '';
  public formulario_roles_cc: FormGroup;

  constructor(
  ) { }

  ngOnInit() {
    this.inciarFormulario();
    if (this.saludar) {
      this.saludar.subscribe(data => {
        if (data) {
          this.lista_centro_costos.push(data);
        } else {
        }
      });
    }
    this.mapearRelaciones();
  }
  inciarFormulario() {
    this.formulario_roles_cc = new FormGroup({
      centros_costo: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required)
    });
  }
  public cerrarModal() {
    $('#Modal').modal('toggle');
  }

  agregarRelacion() {
    this.filtroBusqueda = '';
    this.enviarFiltro('');
    this.relacion = new Array<any>();
    // console.log(this.roles_seleccionados);
    this.relacion = {
      rol_id: this.roles_seleccionados.id,
      rol_nombre: this.roles_seleccionados.text,
      centro_consumo: this.centros_costos_seleccionados
    };
    this.inciarFormulario();
    this.enviarDatos.emit(this.relacion);
    this.compararCentroCostos();
    this.filtroBusqueda = '';
    this.cerrarModal();
    this.limpiarSelectRoles();
  }

  limpiarSelectRoles() {
    const role = this.lista_roles;
    this.lista_roles = null;
    this.lista_roles = [];
    setTimeout(() => {
      this.lista_roles = role;
    }, 200);
  }


  onCentroCostoSeleccionado(data) {
    this.centros_costos_seleccionados = data;
  }
  onRolesSeleccionado(data: any) {
    // this.roles_seleccionados = data.data[0];
    data = data.options[data.selectedIndex];
    const rol = { id: data.value, text: data.innerHTML };
    // console.log(rol);
    if (data && data.value) {
      this.roles_seleccionados = rol;
      // console.log(this.roles_seleccionados);
      this.formulario_roles_cc.get('roles').setValue(data.value);
    }
  }

  compararCentroCostos() {
    if (this.relacion) {
      this.relacion.centro_consumo.forEach(item => {
        for (let index = 0; index < this.lista_centro_costos.length; index++) {
          if (item.centro_consumo_identificador === this.lista_centro_costos[index].identificador) {
            this.lista_centro_costos.splice(index, 1);
          }
        }
      });
      this.lista_centro_costos_filtrar = this.lista_centro_costos;
    }
  }

  mapearRelaciones() {
    this.lista_centro_costos_filtrar = this.lista_centro_costos;
  }
  evento(evento) {
    // console.log(evento);
  }
  enviarFiltro(texto: string) {
    this.filtrar.emit(texto);
  }
}
