import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { FormularioDinamicoBase } from 'src/app/entidades/FormularioGenerico';

@Component({
  selector: 'app-input-filtro-generico',
  templateUrl: './input-filtro-generico.component.html',
  styleUrls: ['./input-filtro-generico.component.css']
})
export class InputFiltroGenericoComponent {
  @Input() question: FormularioDinamicoBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
