import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: boolean = false;

  constructor() { }

  public showLoading() {
    this.loading = true;
  }
  public hideLoading() {
    this.loading = false;
  }
  public toogleLoading() {
    this.loading = !this.loading;
  }
}
