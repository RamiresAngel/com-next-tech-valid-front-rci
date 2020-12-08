import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { ItemCodigoRecepcion, Impuesto, Moneda } from 'src/app/entidades';
import { IMyDpOptions } from 'mydatepicker';
import { ConceptoCargaDocumentos, Totales, ImpuestoRD } from '../../models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CDState } from '../../carga-documentos.reducer';

@Component({
  selector: 'app-listar-conceptos',
  templateUrl: './listar-conceptos.component.html',
  styleUrls: ['./listar-conceptos.component.css']
})
export class ListarConceptosComponent implements OnInit {
  @Input() conceptos = new Array<ItemCodigoRecepcion>();
  @Input() impuestos = new Array<Impuesto>();
  @Input() monedas = new Array<Moneda>();
  @Input() moneda: Moneda;
  @Output() onFileChange = new EventEmitter();
  // NgModel para NFC
  @Input() nfcModel: string;
  @Output() nfcModelChange = new EventEmitter();
  // Seleccionar Fecha Factura
  @Output() onFechaSelected = new EventEmitter();
  @Output() actualizarConcepto = new EventEmitter();

  store_conceptos: ConceptoCargaDocumentos[];
  store_impuestos: ImpuestoRD[];
  store_totales = new Totales();
  subscripcion: Subscription;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  constructor(private state: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.state.select('CargaDocumentos').subscribe((state: CDState) => {
      this.store_conceptos = state.conceptos;
      this.store_totales = state.totales;
      this.store_impuestos = state.impuestos;
    });
  }

  onSelectDate(data) {
    this.onFechaSelected.emit(data);
  }

  cargarArchivo(input_archivo: HTMLInputElement, input_txt: HTMLInputElement, tipo: string) {
    const reader = new FileReader();
    const fileData = new FileUpload();
    const file = input_archivo.files[0];
    console.log(reader);
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      fileData.file_name = file.name;
      fileData.file_data = reader.result.toString().split(',')[1];
      input_txt.value = file.name;
      this.onFileChange.emit({ nombre: fileData.file_name, data: fileData.file_data });
    };
  }
  /**
   * Obtiene los datos del concepto de la lista
   * @param data concepto obteneido de la lista
   */
  setConcepto(data) {
    this.actualizarConcepto.emit(data);
  }
}
