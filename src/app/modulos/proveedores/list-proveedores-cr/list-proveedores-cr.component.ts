import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-proveedores-cr',
  templateUrl: './list-proveedores-cr.component.html',
  styleUrls: ['./list-proveedores-cr.component.css']
})
export class ListProveedoresCrComponent implements OnInit {
  @Input() filtroConsulta;
  constructor() { }

  ngOnInit() {
  }

}
