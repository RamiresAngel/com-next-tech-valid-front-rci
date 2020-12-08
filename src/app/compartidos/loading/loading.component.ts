import { LoadingService } from './../servicios_compartidos/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  public logo_img = './assets/img/NEXT_5.png';
  public loading: boolean = false;

  constructor(public loadingService: LoadingService) { }

}
