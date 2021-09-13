import { ListRolComponent } from './../list-rol/list-rol.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-rol',
  templateUrl: './main-rol.component.html'
})
export class MainRolComponent implements OnInit {
  @ViewChild('lista') lista: ListRolComponent;
  constructor() { }

  ngOnInit() {
  }

}
