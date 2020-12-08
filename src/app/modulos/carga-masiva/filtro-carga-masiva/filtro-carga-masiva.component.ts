import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FiltroCargaMasiva } from 'src/app/entidades';

@Component({
  selector: 'app-filtro-carga-masiva',
  templateUrl: './filtro-carga-masiva.component.html',
  styleUrls: ['./filtro-carga-masiva.component.css']
})
export class FiltroCargaMasivaComponent implements OnInit {
  @Output() filtrar = new EventEmitter();

  public filtro = new FiltroCargaMasiva();

  date_picker_options: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  lista_sucursales: Array<any> = [];
  // Fechas 
  fecha_recepcion_inicio: any;
  fecha_recepcion_fin: any;

  constructor() { }

  ngOnInit() {
    this.enviarFiltro();
  }
  onSelectSucursal(data) {
    this.filtro.sucursal_identificador = data.value;
  }
  onFehcaInicioSelect(data) {
    this.filtro.fecha_inicio_recepcion = data.formatted
  }
  onFehcaFinSelect(data) {
    this.filtro.fecha_fin_recepcion = data.formatted
  }
  enviarFiltro() {
    this.filtrar.emit(this.filtro);
  }
  limpiarFiltro() {
    this.filtro = new FiltroCargaMasiva();
    this.filtro.fecha_inicio_recepcion
    const sucursales = this.lista_sucursales;
    this.fecha_recepcion_inicio = '';
    this.fecha_recepcion_fin = '';
    setTimeout(() => {
      this.lista_sucursales = sucursales;
    }, 200);
  }
}
