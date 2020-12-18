# ngx-pluto组件库
常用Angular 7+组件，用于PC端中台管理项目、商户管理平台等。支持主题样式、多语言等常用功能。

PS: ngx-pluto组件库前身为本人所在公司维护的一套商户平台组件，几乎完全(99.99%)由本人一个人牵头搭建开发并维护，这里经过增删改一些个性化组件使之成为一套比较通用的Angular 7+组件库，供大家学习使用！目前基础组件功能完善，部分细节待改进，希望大家给出宝贵意见！

## 开始使用

* npm install ngx-pluto;

* 以使用np-button为例;

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

    [示例Demo]https://kevinzhang19870314.github.io/pluto-ui/
    
    [在线文档]https://kevinzhang19870314.github.io/pluto-ui/doc/index.html