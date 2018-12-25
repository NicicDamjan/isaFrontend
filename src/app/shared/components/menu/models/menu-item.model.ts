export class NucleusMenuItem {
  /**
   * Item Title
   * @type {string}
   */
  title: string;

  /**
   * Item URL (absolute)
   * @type {string}
   */
  url?: string;

  /**
   * Icon class name
   * @type {string}
   */
  icon?: string;

  /**
   * Expanded by defaul
   * @type {boolean}
   */
  expanded?: boolean;

  /**
   * Children items
   * @type {List<NucleusMenuItem>}
   */
  children?: NucleusMenuItem[];

  /**
   * Hidden Item
   * @type {boolean}
   */
  hidden?: boolean;

  /**
   * Whether the item is just a group (non-clickable)
   * @type {boolean}
   */
  group?: boolean;
  /** Map of query parameters
   *@type {Params}
   */

  /**
   * Link to parent
   */
  parent?: NucleusMenuItem;

  /**
   * Whether the item is selected
   */
  selected?: boolean;

  /**
   * Uses for auth service actions
   */
  accountAction: string;

  /**
   * @returns item parents in top-down order
   */
  static getParents(item: NucleusMenuItem): NucleusMenuItem[] {
    const parents = [];

    let parent = item.parent;
    while (parent) {
      parents.unshift(parent);
      parent = parent.parent;
    }

    return parents;
  }

  static isParent(
    item: NucleusMenuItem,
    possibleChild: NucleusMenuItem,
  ): boolean {
    return possibleChild.parent
      ? possibleChild.parent === item ||
          this.isParent(item, possibleChild.parent)
      : false;
  }
}
