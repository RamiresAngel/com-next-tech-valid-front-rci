import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { FormularioDinamicoBase, InputItemFD, SelectItemFD } from 'src/app/entidades/FormularioGenerico';


@Component({
  selector: 'app-filtro-generico',
  templateUrl: './filtro-generico.component.html',
  styleUrls: ['./filtro-generico.component.css']
})
export class FiltroGenericoComponent implements OnInit {

  @Input() questions: FormularioDinamicoBase<string>[] = [];
  @Output() filtrar = new EventEmitter();
  form: FormGroup;
  payLoad = '';

  constructor() { }

  ngOnInit() {
    this.form = this.toFormGroup(this.questions);
  }

  onSubmit() {
    this.filtrar.emit(this.form.value);
  }

  limpiarFormulario() {
    this.form = this.toFormGroup(this.questions);
  }
  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: FormularioDinamicoBase<string>[] = [

      new SelectItemFD({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new InputItemFD({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new InputItemFD({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  toFormGroup(questions: FormularioDinamicoBase<string>[]) {
    // our logic to group the posts by category
    if (!questions) { return; }
    const group: any = {};
    // console.log(questions);
    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
