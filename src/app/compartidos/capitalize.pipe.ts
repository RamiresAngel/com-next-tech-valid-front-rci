import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value === null) {
      return '';
    }
    const aux = value.split(' ');
    let completo = '';
    aux.forEach(x => {
      if (x.length > 1) {
        x = x[0].toUpperCase() + x.slice(1).toLowerCase();
        completo = completo + ' ' + x;
      } else {
        x = x.toLowerCase();
        completo = completo + ' ' + x;
      }
    });
    return completo;
  }

}
