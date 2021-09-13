import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-departamento',
  templateUrl: './main-departamento.component.html',
  styleUrls: ['./main-departamento.component.css']
})
export class MainDepartamentoComponent implements OnInit {
  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
