import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css']
})
export class SaldosComponent implements OnInit {
  @Input() orden_compra;

  saldos: any;
  constructor() { }

  ngOnInit() {
    // this.saldos = this.orden_compra.saldos;
  }

}
