import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complemento-pais',
  templateUrl: './complemento-pais.component.html',
  styleUrls: ['./complemento-pais.component.css']
})
export class ComplementoPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
  }

}
