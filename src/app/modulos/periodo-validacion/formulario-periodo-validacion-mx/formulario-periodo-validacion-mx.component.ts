import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodoValidacion } from 'src/app/entidades/periodo-validacion';
import { PeriodoValidacionService } from '../periodo-validacion.service';
import { IMyDpOptions } from 'mydatepicker';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
@Component({
  selector: 'app-formulario-periodo-validacion-mx',
  templateUrl: './formulario-periodo-validacion-mx.component.html',
  styleUrls: ['./formulario-periodo-validacion-mx.component.css']
})
export class FormularioPeriodoValidacionMxComponent implements OnInit {

  public formulario_periodo: FormGroup;
  public obj_periodos = new PeriodoValidacion();
  public array_periodos = new Array<PeriodoValidacion>();
  public matriz_periodos = new Array<any>();
  public txtBtnAgregar = 'Guardar';
  private corporativo_activo: CorporativoActivo;
  public nuevasFechas = false;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    // editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(
    private _servicio_periodos: PeriodoValidacionService,
    private _storageService: StorageService
    , public globals: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.array_periodos = this.obj_periodos.crearMeses();
    this.inicilizarFormularios();
    this.obtenerPeriodos();
  }

  ngOnInit() {

  }

  inicilizarFormularios(): void {
    this.formulario_periodo = new FormGroup({
      fecha_inicio: new FormControl('', Validators.required)
      , fecha_fin: new FormControl('', Validators.required)
    });
  }

  obtenerPeriodos(): void {
    const identificador = this.corporativo_activo.corporativo_identificador;
    this._servicio_periodos.ObtenerListaPeriodosMXPorCorporativo(identificador).subscribe(
      (data: any) => {
        this.array_periodos = data;
        if (this.array_periodos.length < 1) {
          this.nuevasFechas = true;
        }
        this.crearMatrizMeses();
      }
      , (error) => {
      }
    );

  }

  crearMatrizMeses() {
    const d = new Date();
    const n = d.getFullYear();
    this.matriz_periodos[1] = {
      nombre: 'Enero'
      , moral: {
        fecha_inicio: n + '-01-01'
        , fecha_fin: n + '-01-31'
        , mes: 1
      }
      , fisica: {
        fecha_inicio: n + '-01-01'
        , fecha_fin: n + '-01-31'
        , mes: 1
      }
    };
    this.matriz_periodos[2] = {
      nombre: 'Febrero'
      , moral: {
        fecha_inicio: n + '-02-01'
        , fecha_fin: n + '-02-28'
        , mes: 2
      }
      , fisica: {
        fecha_inicio: n + '-02-01'
        , fecha_fin: n + '-02-28'
        , mes: 2
      }
    };
    this.matriz_periodos[3] = {
      nombre: 'Marzo'
      , moral: {
        fecha_inicio: n + '-03-01'
        , fecha_fin: n + '-03-31'
        , mes: 3
      }
      , fisica: {
        fecha_inicio: n + '-03-01'
        , fecha_fin: n + '-03-31'
        , mes: 3
      }
    };
    this.matriz_periodos[4] = {
      nombre: 'Abril'
      , moral: {
        fecha_inicio: n + '-04-01'
        , fecha_fin: n + '-04-30'
        , mes: 4
      }
      , fisica: {
        fecha_inicio: n + '-04-01'
        , fecha_fin: n + '-04-30'
        , mes: 4
      }
    };
    this.matriz_periodos[5] = {
      nombre: 'Mayo'
      , moral: {
        fecha_inicio: n + '-05-01'
        , fecha_fin: n + '-05-31'
        , mes: 5
      }
      , fisica: {
        fecha_inicio: n + '-05-01'
        , fecha_fin: n + '-05-31'
        , mes: 5
      }
    };
    this.matriz_periodos[6] = {
      nombre: 'Junio'
      , moral: {
        fecha_inicio: n + '-06-01'
        , fecha_fin: n + '-06-30'
        , mes: 6
      }
      , fisica: {
        fecha_inicio: n + '-06-01'
        , fecha_fin: n + '-06-30'
        , mes: 6
      }
    };
    this.matriz_periodos[7] = {
      nombre: 'Julio'
      , moral: {
        fecha_inicio: n + '-07-01'
        , fecha_fin: n + '-07-31'
        , mes: 7
      }
      , fisica: {
        fecha_inicio: n + '-07-01'
        , fecha_fin: n + '-07-31'
        , mes: 7
      }
    };
    this.matriz_periodos[8] = {
      nombre: 'Agosto'
      , moral: {
        fecha_inicio: n + '-08-01'
        , fecha_fin: n + '-08-31'
        , mes: 8
      }
      , fisica: {
        fecha_inicio: n + '-08-01'
        , fecha_fin: n + '-08-31'
        , mes: 8
      }
    };
    this.matriz_periodos[9] = {
      nombre: 'Septiembre'
      , moral: {
        fecha_inicio: n + '-09-01'
        , fecha_fin: n + '-09-30'
        , mes: 9
      }
      , fisica: {
        fecha_inicio: n + '-09-01'
        , fecha_fin: n + '-09-30'
        , mes: 9
      }
    };
    this.matriz_periodos[10] = {
      nombre: 'Octubre'
      , moral: {
        fecha_inicio: n + '-10-01'
        , fecha_fin: n + '-10-31'
        , mes: 10
      }
      , fisica: {
        fecha_inicio: n + '-10-01'
        , fecha_fin: n + '-10-31'
        , mes: 10
      }
    };
    this.matriz_periodos[11] = {
      nombre: 'Noviembre'
      , moral: {
        fecha_inicio: n + '-11-01'
        , fecha_fin: n + '-11-30'
        , mes: 11
      }
      , fisica: {
        fecha_inicio: n + '-11-01'
        , fecha_fin: n + '-11-30'
        , mes: 11
      }
    };
    this.matriz_periodos[12] = {
      nombre: 'Diciembre'
      , moral: {
        fecha_inicio: n + '-12-01'
        , fecha_fin: n + '-12-31'
        , mes: 12
      }
      , fisica: {
        fecha_inicio: n + '-12-01'
        , fecha_fin: n + '-12-31'
        , mes: 12
      }
    };
    this.array_periodos.forEach(element => {
      if (element.mes === 1) {
        this.matriz_periodos[element.mes].nombre = 'Enero';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 2) {
        this.matriz_periodos[element.mes].nombre = 'Febrero';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 3) {
        this.matriz_periodos[element.mes].nombre = 'Marzo';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 4) {
        this.matriz_periodos[element.mes].nombre = 'Abril';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 5) {
        this.matriz_periodos[element.mes].nombre = 'Mayo';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 6) {
        this.matriz_periodos[element.mes].nombre = 'Junio';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 7) {
        this.matriz_periodos[element.mes].nombre = 'Julio';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 8) {
        this.matriz_periodos[element.mes].nombre = 'Agosto';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 9) {
        this.matriz_periodos[element.mes].nombre = 'Septiembre';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 10) {
        this.matriz_periodos[element.mes].nombre = 'Octubre';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 11) {
        this.matriz_periodos[element.mes].nombre = 'Noviembre';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
      if (element.mes === 12) {
        this.matriz_periodos[element.mes].nombre = 'Diciembre';
        if (element.persona_tipo === 0) {
          this.matriz_periodos[element.mes].moral.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].moral.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].moral.id = element.id;
          this.matriz_periodos[element.mes].moral.mes = element.mes;
        } else {
          this.matriz_periodos[element.mes].fisica.fecha_fin = element.fecha_fin;
          this.matriz_periodos[element.mes].fisica.fecha_inicio = element.fecha_inicio;
          this.matriz_periodos[element.mes].fisica.id = element.id;
          this.matriz_periodos[element.mes].fisica.mes = element.mes;
        }
      }
    });
    this.matriz_periodos.splice(0, 1);
  }

  actualizarPeriodos(): void {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.array_periodos = new Array<PeriodoValidacion>();
    this.matriz_periodos.forEach(periodo => {
      if (periodo.moral) {
        const aux = new PeriodoValidacion;
        aux.mes = Number(periodo.moral.mes);
        aux.fecha_inicio = periodo.moral.fecha_inicio;
        aux.fecha_fin = periodo.moral.fecha_fin;
        aux.persona_tipo = 0;
        aux.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
        this.array_periodos.push(aux);
      }

      if (periodo.fisica) {
        const aux2 = new PeriodoValidacion();
        aux2.mes = periodo.fisica.mes;
        aux2.fecha_inicio = periodo.fisica.fecha_inicio;
        aux2.fecha_fin = periodo.fisica.fecha_fin;
        aux2.persona_tipo = 1;
        aux2.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
        this.array_periodos.push(aux2);
      }
    });
    this._servicio_periodos.GuardarPeriodoMX(this.array_periodos).subscribe(
      (data) => {
        if (data === 'ok') {
          this.nuevasFechas = false;
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + data, 'error');
        }
        this.txtBtnAgregar = 'Guardar';
      },
      (error) => {
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      },
      () => {
        this.txtBtnAgregar = 'Guardar';
      }
    );
  }

  actualizarFechaInicioMoral(obj: any, mes: any) {
    this.matriz_periodos[Number(obj.date.month) - 1].moral.fecha_inicio = obj.formatted;
  }
  actualizarFechaFinMoral(obj: any, mes: any) {
    this.matriz_periodos[Number(obj.date.month) - 1].moral.fecha_fin = obj.formatted;
  }
  actualizarFechaInicioFisica(obj: any, mes: any) {
    this.matriz_periodos[Number(obj.date.month) - 1].fisica.fecha_inicio = obj.formatted;
  }
  actualizarFechaFinFisica(obj: any, mes: any) {
    this.matriz_periodos[Number(obj.date.month) - 1].fisica.fecha_fin = obj.formatted;
  }


  actualizaCorporativo(obj: any) {
    console.log(obj);
    this.corporativo_activo.corporativo_identificador = obj.value;
    this.obtenerPeriodos();
  }
}
