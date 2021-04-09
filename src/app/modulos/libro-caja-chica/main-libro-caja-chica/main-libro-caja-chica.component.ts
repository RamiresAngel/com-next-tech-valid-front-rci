import { Component, OnInit, ViewChild } from '@angular/core';
import { ListLibroCajaChicaComponent } from '../list-libro-caja-chica/list-libro-caja-chica.component';

@Component({
  selector: 'app-main-libro-caja-chica',
  templateUrl: './main-libro-caja-chica.component.html',
  styleUrls: ['./main-libro-caja-chica.component.css']
})
export class MainLibroCajaChicaComponent implements OnInit {

  @ViewChild('lista') lista: ListLibroCajaChicaComponent;

  constructor() { }

  ngOnInit() {
  }

}
