import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Injector
} from "@angular/core";
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';

// import $ from 'jquery';
// import 'jquery.fancytree';

// import { createTree } from 'jquery.fancytree';

const $ = require('jquery');
const fancytree = require('jquery.fancytree');
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import { KebabComponentData, NpKebab, KebabItem } from "../kebab";

/**
 * @ignore
 */
export interface FancyTreeParams {
  event: any;
  data: any;
}

/**
 * @ignore
 */
@Component({
  selector: `np-tree`,
  templateUrl: 'tree.html',
  styleUrls: ['./skin-np/ui.fancytree.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NpTree implements OnInit, AfterViewInit {
  fancyTree: any;

  @Input() public name: any;
  @Input() public options: any;

  @Output() public onNpTreeInit = new EventEmitter<FancyTreeParams>();
  @Output() public onNpTreeNodeActivate = new EventEmitter<FancyTreeParams>();
  @Output() public onNpTreeNodeClick = new EventEmitter<FancyTreeParams>();
  @Output() public onNpTreeNodeSelect = new EventEmitter<FancyTreeParams>();
  @Output() public onNpTreeNodeRender = new EventEmitter<FancyTreeParams>();
  @Output() public onNpTreeNodeKebabClick = new EventEmitter<{ node: any, menuItem: any }>();

  constructor(private injector: Injector) { }

  ngOnInit() {
    if (!customElements.get('np-tree-kebab') && this.options.kebabData) {
      const kebab = createCustomElement(NpKebab, { injector: this.injector });
      customElements.define('np-tree-kebab', kebab);
    }
  }

  ngAfterViewInit(): void {
    $('#ft_' + this.name).fancytree({
      // #region =============== properties ===============
      source: this.options.source,
      activeVisible: this.options.activeVisible || true,
      aria: this.options.aria || true,
      autoActivate: this.options.autoActivate || true,
      autoCollapse: this.options.autoCollapse || true,
      autoScroll: this.options.autoScroll || true,
      clickFolderMode: this.options.clickFolderMode || 4,
      checkbox: this.options.checkbox || false,
      debugLevel: this.options.debugLevel || 0,
      focusOnSelect: this.options.focusOnSelect || false,
      icon: this.options.icon || false,
      keyboard: this.options.keyboard || true,
      quicksearch: this.options.quicksearch || true,
      selectMode: this.options.selectMode || 1,
      tooltip: this.options.tooltip || false,
      // #endregion =============== properties ===============
      extensions: ['filter'],
      filter: {
        autoApply: (this.options.filter && this.options.filter.autoApply !== undefined) ? this.options.filter.autoApply : true,   // Re-apply last filter if lazy data is loaded
        autoExpand: (this.options.filter && this.options.filter.autoExpand !== undefined) ? this.options.filter.autoExpand : false, // Expand all branches that contain matches while filtered
        counter: (this.options.filter && this.options.filter.counter !== undefined) ? this.options.filter.counter : true,     // Show a badge with number of matching child nodes near parent icons
        fuzzy: (this.options.filter && this.options.filter.fuzzy !== undefined) ? this.options.filter.fuzzy : false,      // Match single characters in order, e.g. 'fb' will match 'FooBar'
        hideExpandedCounter: (this.options.filter && this.options.filter.hideExpandedCounter !== undefined) ? this.options.filter.hideExpandedCounter : true,  // Hide counter badge if parent is expanded
        hideExpanders: (this.options.filter && this.options.filter.hideExpanders !== undefined) ? this.options.filter.hideExpanders : false,       // Hide expanders if all child nodes are hidden by filter
        highlight: (this.options.filter && this.options.filter.highlight !== undefined) ? this.options.filter.highlight : true,   // Highlight matches by wrapping inside <mark> tags
        leavesOnly: (this.options.filter && this.options.filter.leavesOnly !== undefined) ? this.options.filter.leavesOnly : false, // Match end nodes only
        nodata: (this.options.filter && this.options.filter.nodata !== undefined) ? this.options.filter.nodata : true,      // Display a 'no data' status node if result is empty
        mode: (this.options.filter && this.options.filter.mode !== undefined) ? this.options.filter.mode : "dimm"       // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
      },
      // #region  =============== Tree events ===============
      init: (event, data) => {
        this.onNpTreeInit.next({ event: event, data: data });
      },
      // #endregion
      // #region  =============== Node events ===============
      activate: (event, data) => {
        this.onNpTreeNodeActivate.next({ event: event, data: data });

        if (this.options.kebabData && $(data.node.span).find('.np-kebab-wrapper') && $(data.node.span).find('.np-kebab-wrapper').length) {
          $(data.node.span).find('.np-kebab-wrapper')[0].style.display = 'flex';
        }
      },
      click: (event, data) => {
        this.onNpTreeNodeClick.next({ event: event, data: data });
        return true;
      },
      deactivate: (event, data) => {
        if (this.options.kebabData && $(data.node.span).find('.np-kebab-wrapper') && $(data.node.span).find('.np-kebab-wrapper').length) {
          $(data.node.span).find('.np-kebab-wrapper')[0].style.display = 'none';
        }
      },
      select: (event, data) => {
        this.onNpTreeNodeSelect.next({ event: event, data: data });
      },
      createNode: (event, data) => {
        if (this.options.kebabData) {
          var node = data.node;
          this.buildKebabToTreeNode($(node.span), data.node);
        }
      },
      renderNode: (event, data) => {
        this.onNpTreeNodeRender.next({ event: event, data: data });
      }
      // #endregion
    }).on('mouseenter mouseleave', '.fancytree-node', (event: any) => {
      var node = $.ui.fancytree.getNode(event);
      if (this.options.kebabData && $(node.span).find('.np-kebab-wrapper') && $(node.span).find('.np-kebab-wrapper').length) {
        if (event.type === 'mouseenter') {
          node.setActive(true);
        }

        if (event.type === 'mouseleave' &&
          (!$(event.target).hasClass('fas fa-ellipsis-v') ||
            $(event.target).hasClass('x-tooltip-open') ||
            $(event.target).hasClass('np-kebab-wrapper'))) {
          node.setActive(false);
        }
      }
    });

    this.fancyTree = fancytree.getTree('#ft_' + this.name);
  }

  private buildKebabToTreeNode(parentElement: any, node: any) {
    let kebabData: KebabComponentData = this.options.kebabData;
    if (this.options.buildKebabData) {
      kebabData = this.options.buildKebabData(node.data, this.options.kebabData);
    }

    if (!kebabData || !kebabData.items || kebabData.items.length === 0) {
      return;
    }

    const element: NgElement & WithProperties<NpKebab> = document.createElement('np-tree-kebab') as any;
    element.addEventListener('onItemClicked', (res: any) => {
      this.onNpTreeNodeKebabClick.next({ node: node.data, menuItem: res && res.detail && res.detail.item });
      node.setActive(false);
    });
    element.data = kebabData;
    element.display = 'none';
    parentElement.append(element);
  }
}


