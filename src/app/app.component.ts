import { Component, ViewEncapsulation, OnInit, HostBinding } from '@angular/core';
import { NpSideNavItem } from 'projects/ngx-pluto/src';
import { MOCKMENUITEMLIST } from './model';
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

  constructor(private router: Router,
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService) {

  }

  userInfo = {
    'username': 'Pluto测试账户',
    'shopName': ''
  };
  items: NpSideNavItem[] = MOCKMENUITEMLIST;

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  title = 'ngx-pluto';

  ngOnInit(): void {
    console.log(this.items);

    this.themeService.theme.pipe(distinctUntilChanged()).subscribe(res => {
      this.setTheme(res.theme, res.darkness);
    });

    // this.setTheme('teal', false); // Default Theme
  }

  setTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) { return; }
    } else {
      this.isThemeDark = darkness;
    }

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme + THEME_LIGHTNESS_SUFFIX;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }

    this.activeThemeCssClass = cssClass;
  }
}
