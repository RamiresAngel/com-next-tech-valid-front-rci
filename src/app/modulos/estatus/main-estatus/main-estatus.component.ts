import { ListEstatusComponent } from './../list-estatus/list-estatus.component';
import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-estatus',
  templateUrl: './main-estatus.component.html'
})
export class MainEstatusComponent implements OnInit {
  @ViewChild('lista') lista: ListEstatusComponent;
  constructor() { }

  ngOnInit() {
  }

}
