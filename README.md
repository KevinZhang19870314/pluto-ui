# ngx-pluto组件库

Pluto平台组件库

## 开始使用

* npm install ngx-pluto;

* 以使用cil-button为例;

* 添加主题样式import到style.scss中;
```scss
@import '../node_modules/ngx-pluto/lib/theming';
// Include non-theme styles for core.
@include np-core();
@import '../node_modules/ngx-pluto/theme/theming/prebuilt/teal-dark.scss';
@import '~@angular/cdk/overlay-prebuilt.css';
```

* import NpButtonModule到AppModule中;
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NpButtonModule } from 'ngx-pluto';
import { AppComponent } from './app.component';
@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        NpButtonModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

* 在App.component.html使用即可.
```html
<np-button>确定</np-button>
<br />
<np-button buttonType="secondary">点击上传</np-button>
```

* 在线示例：

    [示例Demo]https://sso.ipay.so/controls/#/home
    
    [在线文档]https://sso.ipay.so/controls/doc/index.html