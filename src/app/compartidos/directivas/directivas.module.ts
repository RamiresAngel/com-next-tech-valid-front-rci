import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from '../numbers-only.directive';
import { PorcentajeDirective } from './porcentaje.directive';
import { UppercaseDirective } from './uppercase.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumberDirective,
    PorcentajeDirective,
    UppercaseDirective,
    OnlyNumbersDirective
  ]
  , exports: [
    NumberDirective,
    PorcentajeDirective,
    UppercaseDirective,
    OnlyNumbersDirective
  ]
})
export class DirectivasModule { }
