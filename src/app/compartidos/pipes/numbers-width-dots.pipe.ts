import { Directive, ElementRef, HostListener, Pipe } from '@angular/core';

@Directive({
  selector: 'input[numbersWidthDots]'
})
export class NumbersWidthDotsPipe {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    console.log(/^[0-9]+([.])?([0-9]+)?$/.test(initalValue));
    if (!(/^[0-9]+([.])?([0-9]+)?$/.test(initalValue))) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

}
