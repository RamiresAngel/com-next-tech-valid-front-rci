import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-solicitud-anticipo-cc-cr',
  templateUrl: './list-solicitud-anticipo-cc-cr.component.html',
  styleUrls: ['./list-solicitud-anticipo-cc-cr.component.css']
})
export class ListSolicitudAnticipoCcCrComponent implements OnInit {
  @Input() filtro_anticipo;
  constructor() { }

  ngOnInit() {
  }

}
