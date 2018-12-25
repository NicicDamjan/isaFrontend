import { Component, OnInit } from '@angular/core';
import { UIService } from '../../../core/services/ui.service';

@Component({
  selector: 'nucleus-layout-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss'],
})
export class AuthorizedLayoutComponent implements OnInit {
  public status: boolean;

  constructor(private uiService: UIService) {}

  ngOnInit() {
    this.setVariables();
    this.subscribeOnEvents();
  }

  /**
   * Setting all variables on init
   */
  public setVariables() {
    this.status = true;
  }

  /**
   * Subscribing on all events
   */
  public subscribeOnEvents() {
    this.uiService.menuLayout.subscribe(status => (this.status = status));
  }
}
