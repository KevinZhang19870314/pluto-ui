import {
  Component, ViewEncapsulation, ChangeDetectionStrategy, Input,
  OnInit, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import { MenuItem, UserInfo } from '.';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuService } from './menu.service';

/**
 * @ignore
 */
@Component({
  selector: `np-menu`,
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NpMenu implements OnInit, AfterViewInit, OnChanges {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService
  ) {
  }
  isCollapsed: boolean = false;
  @Input() menus: MenuItem[] = [];
  @Input() userInfo: UserInfo;
  @Input() logo;
  @Input() bg;
  ngOnInit(): void {
    this.menus.forEach(rootNode => {
      this.populateMenuLevel(rootNode);
    });
    // 自动触发，更新菜单
    this.router.events.subscribe(result => {
      if (result instanceof NavigationEnd) {
        this.initpopulateMenuLevel(result.url);
      }
    })
    this.menuService.onCollapsedChanged().subscribe(result => {
      this.isCollapsed = result;
      this.cdr.detectChanges();
    })
    // 由外部触发，更新菜单
    this.menuService.onMenuChanged().subscribe(result => {
      if (result) {
        this.initpopulateMenuLevel(result);
      }
    })

    setTimeout(() => {
      const side = document.getElementById('side-nav-wrapper')
      if (this.bg) {
        document.getElementById('side-nav-wrapper').style.cssText = `background:url(${this.bg}) no-repeat;background-size:100% 100%`;
      }
    }, 0);
  }

  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // fix: 追踪当userinfo改变 / 第一次传进来的时候，显示不正确
    this.cdr.detectChanges();
  }
  toggleMenuOrNavigate(menu: MenuItem, $event) {
    if ($event) {
      $event.stopPropagation();
    }
    menu.expanded = !menu.expanded;
    this.isCollapsed = false;
    this.menus.forEach(rootNode => {
      if (!this.isContains(rootNode, menu)) {
        this.toggleOtherMenus(rootNode, false, menu);
      } else {
        this.toggleOtherMenus(rootNode, true, menu);
      }
    });
    menu.active = !menu.active;
    this.menus.forEach(rootNode => {
      if (this.isContains(rootNode, menu)) {
        this.activeParents(rootNode, true, menu);
      } else {
        this.activeParents(rootNode, false, menu);
      }
    });

    if (menu.route && !menu.children) {
      this.router.navigate([menu.route]);
    }
  }

  populateMenuLevel(rootNode: MenuItem) {
    let queue = [];
    let l = 0;
    queue.push({
      node: rootNode,
      level: l
    });

    while (queue.length > 0) {
      let nodeObj = queue.shift();
      nodeObj.node.level = nodeObj.level;
      if (nodeObj.node && nodeObj.node.children) {
        l++;
        nodeObj.node.children.forEach(element => {
          queue.push({
            node: element,
            level: l
          });
        });
      }
    }
  }
  // 根据传入进来的路由path，计算菜单哪些需要打开
  initpopulateMenuLevel(routePath: string) {
    // if(routePath.startsWith('/shell')){
    // }
    try {
      // 一级菜单判断
      this.menus.forEach(firstMenu => {
        if (firstMenu.children) {
          // 二级菜单判断
          firstMenu.children.forEach(secondMenu => {
            if (secondMenu.route === routePath) {
              firstMenu.active = true;
              firstMenu.expanded = true;
              secondMenu.active = true;
              secondMenu.expanded = true;
              this.cdr.detectChanges();
              throw new Error('complete');
            }
            if (secondMenu.children) {

              // 三级菜单判断
              secondMenu.children.forEach(thirdMenu => {
                if (thirdMenu.route === routePath) {
                  firstMenu.active = true;
                  firstMenu.expanded = true;
                  secondMenu.active = true;
                  secondMenu.expanded = true;
                  thirdMenu.active = true;
                  thirdMenu.expanded = true;
                  this.cdr.detectChanges();
                  throw new Error('complete');
                }
              })
            }
          })
        }
        if (firstMenu.route === routePath) {
          firstMenu.active = true;
          firstMenu.expanded = true;
          this.cdr.detectChanges();
          throw new Error('complete');
        }
      })
    } catch (error) {
    }
  }

  activeParents(rootNode: MenuItem, active: boolean, menu: MenuItem) {
    let queue = [];
    queue.push(rootNode);
    while (queue.length > 0) {
      let node = queue.shift();
      if (node.level >= menu.level && node.displayName !== menu.displayName) {
        node.active = false;
      } else {
        if (this.isContains(node, menu)) {
          node.active = active;
        } else {
          node.active = false;
        }
      }
      if (node && node.children) {
        node.children.forEach(element => {
          queue.push(element);
        });
      }
    }
  }
  inItActive(rootNode: MenuItem, ) {
    // const urlList = location.hash.split('/').filter
    this.route.url.subscribe(v => {
      console.log(v);
    })
  }

  isContains(rootNode, sourceNode) {
    let root = Object.assign({}, rootNode);
    if (root.displayName === sourceNode.displayName) {
      return true;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
      let node = queue.shift();
      if (node.displayName === sourceNode.displayName) {
        return true;
      }
      if (node && node.children) {
        node.children.forEach(element => {
          queue.push(element);
        });
      }
    }

    return false;
  }

  toggleOtherMenus(rootNode, expanded, menu) {
    let queue = [];
    queue.push(rootNode);

    while (queue.length > 0) {
      let node = queue.shift();
      if (node.displayName !== menu.displayName) {
        if (this.isContains(node, menu)) {
          node.expanded = expanded;
        } else {
          node.expanded = false;
        }
      }

      if (node && node.children) {
        node.children.forEach(element => {
          queue.push(element);
        });
      }
    }
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onResize($event) {
    console.log($event.target.innerWidth);
    if ($event.target.innerWidth <= 992) {
      this.isCollapsed = true;
    }

    if ($event.target.innerWidth > 992) {
      this.isCollapsed = false;
    }
  }

  hidenUserName(userName) {
    const regExp = /^.*[\u2E80-\u9FFF].*$/;
    if (!userName) {
      return;
    }
    // 如果长度小于7或者存在中文则不隐藏
    if (userName.length < 7 || regExp.test(userName)) {
      return userName;
    }
    const left = userName.substr(0, 3);
    const right = userName.substring(userName.length - 4);

    // Only show 4 '*' in the middle, make it simple and consistence
    return left.concat('****', right);
  }

}
