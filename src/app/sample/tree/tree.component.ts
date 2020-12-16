import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NpTree } from 'projects/ngx-pluto/src';
import { KebabComponentData } from 'projects/ngx-pluto/src/lib/kebab';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.html',
    styleUrls: ['./tree.scss']
})
export class TreeComponent implements OnInit, AfterViewInit {

    @ViewChild('npTree') npTree: NpTree;
    @ViewChild('npTree1') npTree1: NpTree;

    options: any;
    options1: any;
    // #region source
    source = `[{
        "id": "1",
        "name": "主页",
        "level": 1,
        "nodes": [{
            "id": "1-1",
            "name": "测试1-1",
            "level": 2 
        }]
    },{
        "id": "2",
        "name": "主页2",
        "level": 1,
        "nodes": [{
            "id": "2-1",
            "name": "测试2-1",
            "level": 2 
        }]
    }]`;
    // #endregion
    source_json: any;

    constructor() { }

    ngOnInit() {
        this.source_json = JSON.parse(this.source);
        this.convertToTreeSource();

        this.options = {
            checkbox: true,
            icon: false,
            selectMode: 3,
            source: Object.assign([], this.source_json),
            filter: {
                highlight: false,
                mode: 'hide'
            },
            kebabData: {
                items: [
                    { value: '新增订单', id: 0 },
                    { value: '修改订单', type: 'text', id: 1 },
                    { value: '删除订单', id: 2 },
                    { value: '联系我们', type: 'text', id: 3 },
                    { value: '', type: 'separator', color: 'gray' },
                    { value: 'fas fa-question-circle', type: 'icon', color: '#F8AF12' }
                ],
                limit: 6
            },
            buildKebabData: (node: any, data: KebabComponentData) => {
                let result = { ...data };
                if (node.id === "02f9") {
                    result.limit = 5;
                }

                return result;
            }
        };

        this.options1 = {
            checkbox: true,
            icon: false,
            selectMode: 3,
            source: Object.assign([], this.source_json),
            filter: {
                highlight: false,
                mode: 'hide'
            }
        };


    }

    ngAfterViewInit(): void {
        // this.onTest();
    }

    onTest() {
        if (this.npTree) {
            this.npTree.fancyTree.filterNodes(function (node) {
                return node.data.level === 1;
            });
        }

        if (this.npTree1) {
            this.npTree1.fancyTree.filterNodes(function (node) {
                return node.data.level === 2;
            });
        }
    }

    convertToTreeSource() {
        this.source_json.forEach(rootNode => {
            let queue = [];
            queue.push(rootNode);

            while (queue.length > 0) {
                let nodeObj = queue.shift();

                nodeObj.title = nodeObj.name;
                nodeObj.children = nodeObj.nodes;

                if (nodeObj && nodeObj.nodes) {
                    nodeObj.nodes.forEach(element => {
                        queue.push(element);
                    });
                }
            }
        });
    }

    onTreeClicked($event) {
        // console.log($event.data.node.title);
    }

    onTreeSelected($event) {
        // console.log($event.data.node.selected);
    }

    onNpTreeNodeKebabClick($event) {
        console.log($event);
    }
}
