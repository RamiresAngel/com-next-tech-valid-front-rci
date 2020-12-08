import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-sustitucion-cfdi',
  templateUrl: './form-sustitucion-cfdi.component.html',
  styleUrls: ['./form-sustitucion-cfdi.component.css']
})
export class FormSustitucionCfdiComponent implements OnInit {

  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
