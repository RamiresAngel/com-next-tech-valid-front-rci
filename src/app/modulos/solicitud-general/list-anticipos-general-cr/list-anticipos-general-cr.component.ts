import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-anticipos-general-cr',
  templateUrl: './list-anticipos-general-cr.component.html',
  styleUrls: ['./list-anticipos-general-cr.component.css']
})
export class ListAnticiposGeneralCrComponent implements OnInit {
  @Input() filtro_anticipo;

  constructor() { }

  ngOnInit() {
  }

}
