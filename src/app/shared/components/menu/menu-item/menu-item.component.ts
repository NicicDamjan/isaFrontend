import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NucleusMenuItem } from '../models/menu-item.model';

@Component({
  selector: 'nucleus-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  /**
   * Config object
   */
  @Input()
  public menuItem = <NucleusMenuItem>null;

  /**
   * Event for hover on menu item
   */
  @Output()
  hoverItem = new EventEmitter<NucleusMenuItem>();

  /**
   * Event for click on menu item
   */
  @Output()
  itemClick = new EventEmitter<NucleusMenuItem>();

  constructor() {}

  ngOnInit() {}

  /**
   * Triggers on menu click
   * IMPORTANT
   * Event should be replaced with model of data for each menu item
   * @param event
   */
  public onItemClick() {
    this.itemClick.emit(this.menuItem);
  }

  /**
   * Triggers on mouse hover
   * @param event
   */
  public onHoverItem() {
    this.hoverItem.emit(this.menuItem);
  }
}
