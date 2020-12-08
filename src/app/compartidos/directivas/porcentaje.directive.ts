import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPorcentaje]'
})
export class PorcentajeDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const valor = this._el.nativeElement.value;
    const isValid = valor.match(/^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/) == null ? false : true;
    console.log(isValid);
    if (!isValid) {
      event.stopPropagation();
    }
  }
}
