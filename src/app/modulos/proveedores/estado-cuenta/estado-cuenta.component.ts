import { Component, OnInit } from '@angular/core';
import { EstadoCuenta } from 'src/app/entidades/estado-cuenta';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  public tipo = 1;
  public lista_anios: any;
  public lista_meses: any;
  public estadoCuenta = new EstadoCuenta();
  public startValue_anio: any;
  public startValue_mes: any;
  public fech_ini: any;
  public fech_fin: any;

  constructor() { }

  ngOnInit() {
  }

  onAnioSeleccionado(dato: any) {

  }

  onMesSeleccionado(dato: any) {

  }
  onFechaInicio(dato) {

  }

  onFechaFin(dato) {

  }

  limpiar() {

  }

  buscar() {

  }

}
