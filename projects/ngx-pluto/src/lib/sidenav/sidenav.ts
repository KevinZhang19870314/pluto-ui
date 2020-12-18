import { Component, OnInit, Input, Renderer2, ElementRef, HostListener, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 侧边菜单
 * 
 * Example of usage:
 * <example-url>https://stackblitz.com/edit/x-button?embed=1&file=src/app/app.component.ts</example-url>
 */
@Component({
  selector: `np-sidenav`,
  templateUrl: 'sidenav.html',
  styleUrls: ['sidenav.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpSideNav implements OnInit {

  @Input() items: NpSideNavItem[] = [];


  constructor(private renderer2: Renderer2,
    private el: ElementRef,
    private router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
  }

  onItemClicked(item: NpSideNavItem) {
    item.expanded = !item.expanded;
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}

export interface NpSideNavItem {
  /**唯一id标识 */
  id: string | number;
  /**菜单名称 */
  displayName: string;
  /**菜单fa icon， */
  iconName?: string;
  /**菜单跳转路由 */
  route?: string;
  /**需要高亮的路由数组，包含在此数组中的路由都会高亮当前route */
  highlightRoutes?: string[];
  /**子菜单数组 */
  children?: NpSideNavItem[];
  /**是否展开当前菜单 */
  expanded?: boolean;
}

