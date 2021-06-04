import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-main',
  templateUrl: './reporte-main.component.html',
  styleUrls: ['./reporte-main.component.css']
})
export class ReporteMainComponent implements OnInit {

  pageData = {
    title: 'Reportes',
    breadcumbs: ['Comprobaciones', 'Reportes'],

  }

  constructor() { }

  ngOnInit() {
  }

}
