/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ViewportRuler} from '@angular/cdk/scrolling';
import {getMutableClientRect, adjustClientRect} from './client-rect';

/** @ignore
 * Object holding the scroll position of something. */
interface ScrollPosition {
  top: number;
  left: number;
}

/** @ignore
 * Keeps track of the scroll position and dimensions of the parents of an element. */
export class ParentPositionTracker {
  /** Cached positions of the scrollable parent elements. */
  readonly positions = new Map<Document|HTMLElement, {
    scrollPosition: ScrollPosition,
    clientRect?: ClientRect
  }>();

  constructor(private _document: Document, private _viewportRuler: ViewportRuler) {}

  /** Clears the cached positions. */
  clear() {
    this.positions.clear();
  }

  /** Caches the positions. Should be called at the beginning of a drag sequence. */
  cache(elements: HTMLElement[] | ReadonlyArray<HTMLElement>) {
    this.clear();
    this.positions.set(this._document, {
      scrollPosition: this._viewportRuler.getViewportScrollPosition(),
    });

    elements.forEach(element => {
      this.positions.set(element, {
        scrollPosition: {top: element.scrollTop, left: element.scrollLeft},
        clientRect: getMutableClientRect(element)
      });
    });
  }

  /** Handles scrolling while a drag is taking place. */
  handleScroll(event: Event): ScrollPosition | null {
    const target = event.target as HTMLElement | Document;
    const cachedPosition = this.positions.get(target);

    if (!cachedPosition) {
      return null;
    }

    // Used when figuring out whether an element is inside the scroll parent. If the scrolled
    // parent is the `document`, we use the `documentElement`, because IE doesn't support
    // `contains` on the `document`.
    const scrolledParentNode = target === this._document ? target.documentElement : target;
    const scrollPosition = cachedPosition.scrollPosition;
    let newTop: number;
    let newLeft: number;

    if (target === this._document) {
      const viewportScrollPosition = this._viewportRuler!.getViewportScrollPosition();
      newTop = viewportScrollPosition.top;
      newLeft = viewportScrollPosition.left;
    } else {
      newTop = (target as HTMLElement).scrollTop;
      newLeft = (target as HTMLElement).scrollLeft;
    }

    const topDifference = scrollPosition.top - newTop;
    const leftDifference = scrollPosition.left - newLeft;

    // Go through and update the cached positions of the scroll
    // parents that are inside the element that was scrolled.
    this.positions.forEach((position, node) => {
      if (position.clientRect && target !== node && scrolledParentNode.contains(node)) {
        adjustClientRect(position.clientRect, topDifference, leftDifference);
      }
    });

    scrollPosition.top = newTop;
    scrollPosition.left = newLeft;

    return {top: topDifference, left: leftDifference};
  }
}
