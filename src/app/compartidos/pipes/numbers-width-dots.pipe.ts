import { Directive, ElementRef, HostListener, Pipe } from '@angular/core';

@Directive({
  selector: 'input[numbersWidthDots]'
})
export class NumbersWidthDotsPipe {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    console.log(event);
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/^[0-9]+([.])?([0-9]+)?$/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
