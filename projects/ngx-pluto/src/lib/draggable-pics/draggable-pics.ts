import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { CdkDropListGroup, CdkDropList, CdkDragMove, moveItemInArray, CdkDrag } from '../drag-drop/index';
import { Utils } from '../utils';

/**
 * 可拖拽图片组件 - 上传多张图片时展示多图并可拖拽改变排列顺序
 * 
 * <example-url>https://stackblitz.com/edit/np-draggable-pics-sample?embed=1&file=src/app/app.component.html</example-url>
 */
@Component({
  selector: `np-draggable-pics`,
  templateUrl: 'draggable-pics.html',
  styleUrls: ['draggable-pics.scss'],
  host: {
    'class': 'host-inline-block'
  },
  encapsulation: ViewEncapsulation.None
})
export class NpDraggablePics implements OnInit {

  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  /**包含图片url的图片列表，可选值id（unique） */
  @Input() items: Array<{ url: string, id?: string }> = [];

  /**图片展示宽度 */
  @Input() itemWidth: number;

  /**图片展示高度 */
  @Input() itemHeight: number;

  /**是否禁用图片可拖拽删除 */
  @Input() isDisabled: boolean;

  target: CdkDropList;
  targetIndex: number;
  source: CdkDropList;
  sourceIndex: number;
  dragIndex: number;
  activeContainer;

  constructor(private viewportRuler: ViewportRuler) {
    this.target = null;
    this.source = null;
  }

  ngOnInit(): void {
    this.items.forEach(item => {
      if (!item.id) {
        item.id = Utils.ID();
      }
    });
  }

  ngAfterViewInit() {
    let phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  dragMoved(e: CdkDragMove) {
    if (this.isDisabled) {
      return;
    }
    let point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped() {
    if (!this.target)
      return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex != this.targetIndex)
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop == this.placeholder)
      return true;

    if (drop != this.activeContainer)
      return false;

    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
      ? dropElement.nextSibling : dropElement));

    this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
    return false;
  }

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top
    };
  }

  onRemove(item: { url: string, id?: string }) {
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}


