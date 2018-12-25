import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NucleusMenuItem } from './models/menu-item.model';
import { UIService } from '../../../core/services/ui.service';

/**
 * @author Mudrinic
 */
@Component({
  selector: 'nucleus-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  /**
   * Starting route url
   */
  @Input()
  public routerCore: string;

  /**
   * MenuItems
   */
  @Input()
  public items: NucleusMenuItem[];

  /**
   * If it's true - navExpanded
   * else notExpanded
   */
  public menuState: boolean = false;

  constructor(private router: Router, private uiService: UIService) {}

  ngOnInit() {}

  /**
   * Handles clickItem event
   * @param menuItem
   */
  public onClickItem(menuItem: NucleusMenuItem) {
    if (menuItem.url)
      this.router.navigateByUrl(`${this.routerCore}/${menuItem.url}`);
    if (menuItem.accountAction) {
      if (menuItem.accountAction === 'logout') {
        localStorage.clear();
        this.router.navigateByUrl('auth');
      }
    }
  }

  /**
   * Handles hoverItem event
   * @param menuItem
   */
  public onHoverItem(menuItem: NucleusMenuItem) {}

  public changeMenuState() {
    this.uiService.onMenuLayout(this.menuState);
    this.menuState = !this.menuState;
  }
}
