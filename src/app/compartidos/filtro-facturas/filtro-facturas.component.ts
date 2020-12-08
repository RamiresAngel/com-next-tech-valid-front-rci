// import { CentConMin } from './../../modulos/usuarios/clases/min';
import { HttpResponse } from '@angular/common/http';
import { StorageService } from './../login/storage.service';
import { CorporativoService } from './../../modulos/corporativo/corporativo.service';
import { Usuario } from './../../entidades/usuario';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  ElementRef
} from '@angular/core';
import { Filtro } from './../../entidades/filtro';
declare var $: any;

@Component({
  selector: 'app-filtro-facturas',
  templateUrl: './filtro-facturas.component.html',
  styleUrls: ['./filtro-facturas.component.css']
})
export class FiltroFacturasComponent implements OnInit {
  @ViewChild('filtro') filtro: any = new Filtro();
  // @Input() filtroUsuario: Filtro = new Filtro();
  @ViewChild('daterange2') daterange2: ElementRef;
  @Output() abilitar = new EventEmitter();
  @Input() filtroConsulta;
  public selectCC: any;
  public showCorp = false;
  public daterange: any = {};
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false
  };
  listCorporativos: any;
  listSucursales: any;
  corporativo_id: number;
  user = new Usuario();
  admin_next: any;
  // public centrosconsumo: CentConMin[];
  constructor(
    private _corporativoService: CorporativoService,
    private _storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this._storageService.loadSessionData();
    // this.admin_next = this.user.admin_next;
    //
    if (this.admin_next === 1) {
      this.showCorp = true;
    }
    // this._corporativoService.obtenerCorporativos('1')
    //   .subscribe((data: any) => {
    //     this.listCorporativos = data.body;
    //   });

    this.corporativo_id = this.user.corporativo_id;

    // this._corporativoService.obtnenerSucursalMin(this.corporativo_id)
    //   .subscribe((data: any) => {
    //     this.listSucursales = data.body;
    //     $('#selectCCS2').select2();
    //   });
  }

  cleanForm() {
    $('#selectCCS2').prop('selected', false);
    $('#selectCCS2').select2();
    $('#selectCCS2').select2('destroy');
    $('#selectCCS2').select2();
    this.filtroConsulta.cedula_emisor = '';
    this.filtroConsulta.clave = '';
    this.filtroConsulta.estatus_dgt = '';
    this.filtroConsulta.estatusNegocio = '';
    this.filtroConsulta.fecha_creacion = '';
    this.filtroConsulta.fecha_emision = '';
    this.filtroConsulta.moneda = '';
    this.filtroConsulta.razon_social = '';
    this.filtroConsulta.tipoDte = '';
    this.filtroConsulta.corporativo_id = this.corporativo_id;
    this.filtroConsulta.sucursal_id = 0;
    this.filtroConsulta.centro_consumo_id = [];
    this.filtroConsulta.estatus_acuse = '';
  }

  ListInvoicesFiltred() {
    const filtroAux = new Filtro();
    if (
      this.filtroConsulta.cedula_emisor !== null &&
      this.filtroConsulta.cedula_emisor !== ''
    ) {
      filtroAux.cedula_emisor = this.filtroConsulta.cedula_emisor;
    }
    if (
      this.filtroConsulta.clave !== null &&
      this.filtroConsulta.clave !== ''
    ) {
      filtroAux.clave = this.filtroConsulta.clave;
    }
    if (
      this.filtroConsulta.estatus_dgt !== null &&
      this.filtroConsulta.estatus_dgt !== ''
    ) {
      filtroAux.estatus_dgt = this.filtroConsulta.estatus_dgt;
    }
    if (
      this.filtroConsulta.estatusNegocio !== null &&
      this.filtroConsulta.estatusNegocio !== ''
    ) {
      filtroAux.estatusNegocio = this.filtroConsulta.estatusNegocio;
    }
    if (
      this.filtroConsulta.fecha_creacion !== null &&
      this.filtroConsulta.fecha_creacion !== ''
    ) {
      filtroAux.fecha_creacion = this.filtroConsulta.fecha_creacion;
    }
    if (
      this.filtroConsulta.fecha_emision !== null &&
      this.filtroConsulta.fecha_emision !== ''
    ) {
      filtroAux.fecha_emision = this.filtroConsulta.fecha_emision;
    }
    if (
      this.filtroConsulta.moneda !== null &&
      this.filtroConsulta.moneda !== ''
    ) {
      filtroAux.moneda = this.filtroConsulta.moneda;
    }
    if (
      this.filtroConsulta.razon_social !== null &&
      this.filtroConsulta.razon_social !== ''
    ) {
      filtroAux.razon_social = this.filtroConsulta.razon_social;
    }
    if (
      this.filtroConsulta.tipoDte !== null &&
      this.filtroConsulta.tipoDte !== ''
    ) {
      filtroAux.tipoDte = this.filtroConsulta.tipoDte;
    }

    if ((this.admin_next = 1)) {
      if (
        this.filtroConsulta.corporativo_id !== null &&
        this.filtroConsulta.corporativo_id !== ''
      ) {
        filtroAux.corporativo_id = this.filtroConsulta.corporativo_id;
      }
    } else {
      this.filtroConsulta.corporativo_id = this.corporativo_id;
      filtroAux.corporativo_id = this.filtroConsulta.corporativo_id;
    }

    if (
      this.filtroConsulta.sucursal_id !== null &&
      this.filtroConsulta.sucursal_id !== ''
    ) {
      filtroAux.sucursal_id = this.filtroConsulta.sucursal_id;
    }

    if (
      this.filtroConsulta.centro_consumo_id !== null &&
      this.filtroConsulta.centro_consumo_id !== ''
    ) {
      const selected = [];
      let aux = 0;
      $('#selectCCS2 :selected').each(function() {
        selected[aux] = $(this)
          .val()
          .split(':')[1]
          .trim();
        aux++;
      });
      this.filtroConsulta.centro_consumo_id = selected;
      // filtroAux.centro_consumo_id = this.filtroConsulta.centro_consumo_id;
    }
    this.abilitar.emit(this.filtroConsulta);
  }
  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  ActualizaSelecSuc(data: any) {
    this.filtroConsulta.corporativo_id = data;
    // this._servicioCC
    //   .getSucursalMin(data)
    //   .subscribe((sucursales: HttpResponse<any>) => {
    //     this.listSucursales = sucursales.body;
    //   });
  }

  ActualizaSelecCC(data: any) {
    // this._servicioCC
    //   .getCCfromSuc(data)
    //   .subscribe((centrosconsumo: HttpResponse<any>) => {
    //     // this.centrosconsumo = centrosconsumo.body;
    //     $('#selectCCS2').select2();
    //   });
  }
}
