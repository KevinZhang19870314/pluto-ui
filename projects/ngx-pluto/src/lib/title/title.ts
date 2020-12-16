import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

/**
 * 标题组件 - 常用于展示panel标题、数据分组标题及公告标题等。
 * 
 * <example-url>https://stackblitz.com/edit/np-title-sample?embed=1&file=src/app/app.component.html</example-url>
 */

@Component({
  selector: `np-title`,
  templateUrl: 'title.html',
  styleUrls: ['title.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NpTitle implements OnInit {

  /**默认标题 - 默认此标题带有下划线及左侧Pluto色加粗border */
  @Input() text: string = '';

  /**当标题类型为text或notice时的描述 - 以小字展示与标题右侧 */
  @Input() description: string = '';

  /**是否显示标题类型为text的左侧Pluto色加粗border */
  @Input() vBar: boolean = true;

  /**是否加粗标题类型为text的标题 */
  @Input() bold: boolean = false;

  /**
   * 标题类型
   * 
   * title - 常用于panel的标题，默认带有左侧加粗border和下划线
   * 
   * caption - 常用于分组展示数据标题，默认带有左侧加粗border
   * 
   * notice - 类似小喇叭公告，默认左侧有小喇叭图标，接着标题及描述
   */
  @Input() type: 'title' | 'caption' | 'notice' = 'title';

  constructor() { }

  ngOnInit(): void {

  }
}


