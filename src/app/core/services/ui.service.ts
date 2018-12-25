import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UIService {
  @Output()
  menuLayout = new EventEmitter<boolean>();

  constructor() {}

  /**
   * Dispach event on menuLayout trigger
   * @param status
   */
  public onMenuLayout(status: boolean) {
    this.menuLayout.emit(status);
  }
}
