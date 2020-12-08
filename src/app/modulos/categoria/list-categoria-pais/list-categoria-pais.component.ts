import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-categoria-pais',
  templateUrl: './list-categoria-pais.component.html',
  styleUrls: ['./list-categoria-pais.component.css']
})
export class ListCategoriaPaisComponent implements OnInit {
  public pais = 'mx';
  constructor() {}

  ngOnInit() {
    this.pais = 'mx';
  }
}
