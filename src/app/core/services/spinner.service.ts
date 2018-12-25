import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerService {
  public loaders: Promise<any>[] = [];

  constructor(private spinner: NgxSpinnerService) {}

  registreLoader(method: Promise<any>): void {
    this.loaders.push(method);
  }

  showSpinner() {
    this.spinner.show();
    this.execute();
  }

  execute() {
    Promise.all(this.loaders).then(() => {
      this.hideSpinner();
    });
  }

  hideSpinner() {
    this.spinner.hide();
  }
}