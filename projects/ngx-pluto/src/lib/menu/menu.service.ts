import { Injectable, Inject } from '@angular/core';
import { MENUS } from './menus';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private updateMenu$ = new BehaviorSubject<string>('');
  private collapsed = new Subject<boolean>();
  private collapsed$;
  menus: any;
  constructor() {
    this.menus = MENUS;
    this.collapsed$ = this.collapsed.asObservable();
  }

  getMenus(usecases) {
    const menus = JSON.parse(this.menus);

    const unSelected = this._getUnPermissionUsecases(menus, usecases);
    for (let i = 0; i < unSelected.length; i++) {
      this._filterMenus(menus, unSelected[i]);
    }

    return menus;
  }

  _filterMenus(nodes, delId) {
    if (!nodes) {
      return [];
    }

    if (nodes.find(f => f.id === delId)) {
      nodes.splice(nodes.findIndex(v => v.id === delId), 1);
    } else {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].children && nodes[i].children.length > 0) {
          this._filterMenus(nodes[i].children, delId);
        }
      }
    }
  }

  _getUnPermissionUsecases(nodes, ids) {
    const unSelectedIds = [];
    nodes.forEach(rootNode => {
      const queue = [];
      queue.push(rootNode);

      while (queue.length > 0) {
        const nodeObj = queue.shift();

        if (ids.indexOf(nodeObj.id) === -1) {
          unSelectedIds.push(nodeObj.id);
        }

        if (nodeObj && nodeObj.children) {
          nodeObj.children.forEach(element => {
            queue.push(element);
          });
        }
      }
    });
    return unSelectedIds;
  }
  notifyMenu(url: string) {
    this.updateMenu$.next(url);
  }
  onMenuChanged() {
    return this.updateMenu$;
  }
  notifyCollapsed(status: boolean) {
    this.collapsed.next(status)
  }
  onCollapsedChanged() {
    return this.collapsed$;
  }





}
