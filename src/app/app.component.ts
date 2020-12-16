import { Component, ViewEncapsulation, OnInit, HostBinding } from '@angular/core';
import { MenuItem } from 'projects/ngx-pluto/src';
import { MOCKMENUITEMLIST } from './model';
import { MenuService } from 'projects/ngx-pluto/src/lib/menu/menu.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './theme.service';
import { distinctUntilChanged } from 'rxjs/operators';

const THEME_DARKNESS_SUFFIX = `-dark`;
const THEME_LIGHTNESS_SUFFIX = `-light`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  //#region Sidebar usage
  private _opened: boolean = true;
  private _modeNum: number = 0;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  private _MODES: Array<string> = ['push', 'over', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  //#endregion

  userInfo = {
    'username': 'Pluto测试账户',
    'shopName': ''
  }
  menuList: MenuItem[] = MOCKMENUITEMLIST;

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  constructor(private menuService: MenuService,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService) {

  }

  ngOnInit(): void {
    console.log(this.menuList);
    this.menuService.notifyMenu('6666');

    this.themeService.theme.pipe(distinctUntilChanged()).subscribe(res => {
      this.setTheme(res.theme, res.darkness);
    });

    // this.setTheme('teal', false); // Default Theme
  }

  setTheme(theme: string, darkness: boolean = null) {
    if (darkness === null)
      darkness = this.isThemeDark;
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return;
    } else
      this.isThemeDark = darkness;

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme + THEME_LIGHTNESS_SUFFIX;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass);
    else
      classList.add(cssClass);

    this.activeThemeCssClass = cssClass;
  }

  title = 'ngx-pluto';

  protected test(): void {
    alert('test');
  }

  onJustForFunny() {
    this.router.navigate(['justforfunny']);
  }

  //#region Sidebar usage
  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  private _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  private _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  private _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }
  //#endregion
}
