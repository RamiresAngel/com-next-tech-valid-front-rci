import { Component, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { CuentaProrrateo } from 'src/app/entidades';
declare var $: any;
@Component({
  selector: 'app-modal-prorrateo',
  templateUrl: './modal-prorrateo.component.html',
  styleUrls: ['./modal-prorrateo.component.css']
})
export class ModalProrrateoComponent implements OnChanges {
  @Input() lista_departamentos_prorrateo = new Array<CuentaProrrateo>();
  lista_departamentos = new Array<CuentaProrrateo>();
  @Input() monto_comprobar = 0;
  @Input() identificador_header;
  @Output() guardarProrrateo = new EventEmitter();
  btnGuardar: HTMLButtonElement;



  public comprobado;
  moneda_porcentaje: string;
  public porcentaje_comprobado;
  public comprobado_maximo;
  public comprobado_minimo;

  constructor() { }

  ngOnChanges() {
    this.lista_departamentos = [...this.lista_departamentos_prorrateo];
    this.calcularMontosIniciales();
  }

  calcularComprobadoPorcentaje() {
    let aux_monto_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar); // .toFixed(2);
    this.lista_departamentos_prorrateo.forEach(element => {
      console.log(this.monto_comprobar);
      const monto = (element.porcentaje_asignado * this.monto_comprobar) / 100;
      element.importe_asignado = monto; // .toFixed(2);
      console.log(monto);
      aux_monto_comprobado += Number(element.importe_asignado);
    });
    this.comprobado = aux_monto_comprobado; // .toFixed(2);
    this.comprobado = Number(Number(this.comprobado).toFixed(2));
    console.log(this.comprobado);
    let aux_porcentaje_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_porcentaje_comprobado += Number(prorrateo.porcentaje_asignado);
    });
    this.porcentaje_comprobado = Number(aux_porcentaje_comprobado.toFixed(2));
  }

  public cerrarModalDepartamento(): void {
    $('#modal-deptos').modal('toggle');
  }


  calcularComprobado() {
    let aux_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_comprobado += Number(prorrateo.importe_asignado);
    });
    this.comprobado = aux_comprobado.toFixed(2);
    this.comprobado_minimo = Number(this.monto_comprobar) - 0.01;
    this.comprobado_maximo = Number(this.monto_comprobar) + 0.01;
    this.comprobado_minimo = Number(this.comprobado_minimo).toFixed(2);
    this.comprobado_maximo = Number(this.comprobado_maximo).toFixed(2);
    // this.comprobado = (aux_comprobado).toFixed(2);

    let aux_procentaje_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar.toFixed(2));
    this.lista_departamentos_prorrateo.forEach(element => {
      const porcentaje = (element.importe_asignado * 100) / this.monto_comprobar;
      element.porcentaje_asignado = Number(porcentaje.toFixed(2));
      aux_procentaje_comprobado += Number(element.porcentaje_asignado);
    });
    this.porcentaje_comprobado = Number(aux_procentaje_comprobado.toFixed(2));
    this.comprobado = Number(this.comprobado);
  }

  guardarConProrrateo(btn: HTMLButtonElement) {
    this.btnGuardar = btn;
    this.setButtonLoading();
    this.lista_departamentos.length = 0;
    this.lista_departamentos_prorrateo.forEach(cuenta => {
      if (Number(cuenta.importe_asignado) > 0) {
        const cuenta_prorrateo = new CuentaProrrateo();
        cuenta_prorrateo.importe_asignado = cuenta.importe_asignado;
        cuenta_prorrateo.porcentaje_asignado = cuenta.porcentaje_asignado;
        cuenta_prorrateo.id_cuenta_agrupacion = cuenta.id_cuenta_agrupacion;
        cuenta_prorrateo.identificador_cuenta = cuenta.cuenta_codigo;
        cuenta_prorrateo.identificador_header = this.identificador_header;
        cuenta_prorrateo.ceco = cuenta.ceco;
        // cuenta_prorrateo.preliminar_detalle_id = 0;
        this.lista_departamentos.push(cuenta_prorrateo);
      }
    });

    this.guardarProrrateo.emit(this.lista_departamentos);
    // this.acreedor_diverso.cuentas_prorrateo = new Array<CuentasProrateo>();
    // // this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    // this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    // this.acreedor_diverso.lista_negra = this.datos_inciales.usuario.lista_negra;
    // this.acreedor_diverso.identificador_departamento = '';
    // this.lista_departamentos_prorrateo.forEach(cuenta => {
    //   if (Number(cuenta.monto) > 0) {
    //     const cuenta_prorrateo = new CuentasProrateo();
    //     cuenta_prorrateo.importe_asignado = cuenta.monto;
    //     cuenta_prorrateo.porcentaje_asignado = cuenta.porcentaje;
    //     cuenta_prorrateo.id_cuenta_agrupacion = cuenta.id_cuenta_agrupacion;
    //     cuenta_prorrateo.ceco = cuenta.ceco;
    //     // cuenta_prorrateo.ceco = this.acreedor_diverso.ceco;
    //     cuenta_prorrateo.preliminar_detalle_id = 0;
    //     // cuenta_prorrateo.id_cuenta_agrupacion = cuenta.identificador_departamento; // poner el id
    //     this.acreedor_diverso.cuentas_prorrateo.push(cuenta_prorrateo);
    //     this.acreedor_diverso.prorrateo = 1;
    //   }
    // });
    // this.guardar();
  }

  calcularMontosIniciales() {
    if (this.lista_departamentos_prorrateo.length > 0) {
      const monto_dividido = (this.monto_comprobar / this.lista_departamentos_prorrateo.length);
      const porcentaje = ((monto_dividido) * this.comprobado) / 100;
      this.lista_departamentos_prorrateo.forEach(element => {
        element.importe_asignado = monto_dividido;
        element.porcentaje_asignado = porcentaje;
      });
      this.calcularComprobado();
      $('#modal-deptos').modal(
        { backdrop: 'static', keyboard: false },
        'show');
    } else {
      // Swal.fire('Atención', 'Esta cuenta no contiene departamentos asociados, por favor contacta con el administrador del sistema', 'error');
    }
  }

  actualizarBoton() {
    this.btnGuardar.innerHTML = 'Guardar';
    this.btnGuardar.disabled = false;
  }

  setButtonLoading() {
    this.btnGuardar.disabled = true;
    this.btnGuardar.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
  }

}

