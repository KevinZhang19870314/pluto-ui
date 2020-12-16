### 如何使用及动态切换主题
<br/>  

**ngx-pluto组件库中默认包含了以下预定义主题，也可以按照预定义主题格式自己新增主题**
```scss
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/teal-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/teal-dark.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/red-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/red-dark.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/purple-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/purple-dark.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/orange-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/orange-dark.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/green-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/green-dark.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/blue-light.scss';
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/blue-dark.scss';
```

**1. 安装组件库到angular 6+项目中**
```node
npm install --save ngx-pluto
```
<br/>

**2. 在根目录src下面新建文件themes.scss文件，引入想要的主题;**
```scss
@import '../projects/ngx-pluto/src/theme/theming/prebuilt/teal-light.scss';
// Custom specific component
@import './app/theme/all-theme';
@include custom-specific-theme($theme);
$primary: map-get($theme, primary);
$accent: map-get($theme, accent);
$warn: map-get($theme, warn);
$background: map-get($theme, background);
$foreground: map-get($theme, foreground);
$is-dark: map-get($theme, is-dark);

.app-wrapper {
  background-color: np-color($background, background);
}

.orange-dark {
    @import '../projects/ngx-pluto/src/theme/theming/prebuilt/orange-dark.scss';
    // Custom specific component
    @import './app/theme/all-theme';
    @include custom-specific-theme($theme);
    $primary: map-get($theme, primary);
    $accent: map-get($theme, accent);
    $warn: map-get($theme, warn);
    $background: map-get($theme, background);
    $foreground: map-get($theme, foreground);
    $is-dark: map-get($theme, is-dark);

    .app-wrapper {
    background-color: np-color($background, background);
    }
}

......
```
<br/>

**3. 在style.scss文件中引入themes.scss文件，并相应引入组件库主题所需scss文件**;
```scss
@import '../projects/ngx-pluto/src/theme/all/all-theme';
// Include non-theme styles for core.
@include np-core();

@import './themes.scss';

@import '~@angular/cdk/overlay-prebuilt.css';
```
<br/>

**4. 新增theme.service.ts服务文件**
```ts
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _theme = new BehaviorSubject<{ theme: string, darkness: boolean }>({ theme: 'teal', darkness: false });
    public theme = this._theme.asObservable();

    setTheme(theme: string, darkness: boolean = null) {
        this._theme.next({ theme: theme, darkness: darkness });
    }
}
```
<br/>

**5. 在app.component.ts中使用主题**
```ts
import { Component, ViewEncapsulation, OnInit, HostBinding } from '@angular/core';
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

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  constructor(private overlayContainer: OverlayContainer,
    private themeService: ThemeService) {

  }

  ngOnInit(): void {
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
}
```
<br/>

**6. 如何使用组件库中具体组件请参考【入门指南】--->【手册】**