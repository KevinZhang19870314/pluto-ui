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
    source = `[
    {
        "id": "02f9",
        "name": "主页",
        "level": 1,
        "nodes": [
            {
                "id": "cw8d",
                "name": "平台公告",
                "level": 2,
                "nodes": [
                    {
                        "id": "ar9y",
                        "name": "查看",
                        "level": 3
                    }
                ]
            },
            {
                "id": "1b00",
                "name": "今日数据概览",
                "level": 2,
                "nodes": [
                    {
                        "id": "e7c3",
                        "name": "营销数据",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "ff34",
                                "name": "进行中的活动",
                                "level": 2
                            },
                            {
                                "id": "bcaa",
                                "name": "未开始的活动",
                                "level": 2
                            }
                        ]
                    },
                    {
                        "id": "c099",
                        "name": "会员数据",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "f1e2",
                                "name": "新增会员数",
                                "level": 2
                            },
                            {
                                "id": "6c33",
                                "name": "累计会员数",
                                "level": 2
                            }
                        ]
                    },
                    {
                        "id": "ec97",
                        "name": "点餐数据",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "887d",
                                "name": "订单实收金额",
                                "level": 2
                            },
                            {
                                "id": "e27a",
                                "name": "订单数",
                                "level": 2
                            },
                            {
                                "id": "a887",
                                "name": "笔单价",
                                "level": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "bcc9",
                "name": "成功案例概览",
                "level": 2,
                "nodes": [
                    {
                        "id": "d6cd",
                        "name": "海底捞大学生全场6.9折活动",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1d59",
                                "name": "查看案例详情",
                                "level": 3
                            },
                            {
                                "id": "f762",
                                "name": "立即配置同款",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "197e",
                        "name": "必胜客新店开业消费满送",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "6f28",
                                "name": "查看案例详情",
                                "level": 3
                            },
                            {
                                "id": "8a29",
                                "name": "立即配置同款",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "767b",
                        "name": "双十二限时5折活动爆抢",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "16d9",
                                "name": "查看案例详情",
                                "level": 3
                            },
                            {
                                "id": "aaa6",
                                "name": "立即配置同款",
                                "level": 3
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "b448",
        "name": "营销中心",
        "level": 1,
        "nodes": [
            {
                "id": "a118",
                "name": "创建新活动",
                "level": 1,
                "nodes": [
                    {
                        "id": "b990",
                        "name": "口碑APP",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1c37",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "9ab7",
                        "name": "支付宝大学生活",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1d56",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "c70a",
                        "name": "京东校园专区",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "d185",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "1000",
                        "name": "微信公众号",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "ed8b",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "1b9f",
                        "name": "Pluto自有渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "e394",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "651e",
                        "name": "异业线下合作渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "169d",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "0151",
                        "name": "商家自有线上渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1c31",
                                "name": "创建活动",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "1082",
                        "name": "更多渠道联系我们",
                        "level": 2
                    }
                ]
            },
            {
                "id": "e2d6",
                "name": "活动管理",
                "level": 1,
                "nodes": [
                    {
                        "id": "fc00",
                        "name": "口碑APP",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "f8a6",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "d7e7",
                                "name": "再配一张",
                                "level": 3
                            },
                            {
                                "id": "d7e5",
                                "name": "下架",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "23ba",
                        "name": "支付宝大学生活",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "fb27",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "2c05",
                                "name": "再配一张",
                                "level": 3
                            },
                            {
                                "id": "1d3f",
                                "name": "下架",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "9639",
                        "name": "京东校园专区",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "a917",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "84c5",
                                "name": "下架",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "b3ee",
                        "name": "微信公众号",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1e5c",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "8ec9",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "d7da",
                                "name": "停止",
                                "level": 3
                            },
                            {
                                "id": "08d3",
                                "name": "启用",
                                "level": 3
                            },
                            {
                                "id": "ccb1",
                                "name": "作废",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "8beb",
                        "name": "Pluto自有渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "08d1",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "6ac7",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "85ed",
                                "name": "停止",
                                "level": 3
                            },
                            {
                                "id": "0d96",
                                "name": "启用",
                                "level": 3
                            },
                            {
                                "id": "ec9c",
                                "name": "作废",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "aff4",
                        "name": "异业线下合作渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "1e7a",
                                "name": "查看活动详情",
                                "level": 3
                            },
                            {
                                "id": "485d",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "09db",
                                "name": "导出",
                                "level": 3
                            },
                            {
                                "id": "e7f0",
                                "name": "作废",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "1515",
                        "name": "商家自有线上渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "z6o2",
                                "name": "查看活动详情",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "d08d",
                        "name": "页面功能",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "a821",
                                "name": "立即创建",
                                "level": 3
                            },
                            {
                                "id": "e6ba",
                                "name": "搜索活动名称",
                                "level": 3
                            },
                            {
                                "id": "1b37",
                                "name": "搜索活动时间",
                                "level": 3
                            },
                            {
                                "id": "e299",
                                "name": "筛选活动状态",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "dc4f",
                "name": "精准投放",
                "level": 1,
                "nodes": [
                    {
                        "id": "6d7d",
                        "name": "人群投放",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "a0aa",
                                "name": "添加备注",
                                "level": 3
                            },
                            {
                                "id": "a91a",
                                "name": "修改备注",
                                "level": 3
                            },
                            {
                                "id": "ea4a",
                                "name": "发放",
                                "level": 3
                            },
                            {
                                "id": "0a43",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "f260",
                                "name": "筛选群体",
                                "level": 3
                            },
                            {
                                "id": "4f23",
                                "name": "查询群体名称",
                                "level": 3
                            },
                            {
                                "id": "b2d0",
                                "name": "查询备注",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "9257",
                        "name": "会员投放",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "07aa",
                                "name": "会员查询",
                                "level": 3
                            },
                            {
                                "id": "1d5b",
                                "name": "会员导入",
                                "level": 3
                            },
                            {
                                "id": "e28d",
                                "name": "发放",
                                "level": 3
                            },
                            {
                                "id": "dfd2",
                                "name": "下载模板",
                                "level": 3
                            },
                            {
                                "id": "4e19",
                                "name": "批量发放",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "7aa2",
                        "name": "投放记录",
                        "level": 2
                    }
                ]
            },
            {
                "id": "7476",
                "name": "营销统计",
                "level": 1,
                "nodes": [
                    {
                        "id": "27e0",
                        "name": "口碑APP",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "5f08",
                                "name": "交易数据",
                                "level": 2
                            },
                            {
                                "id": "0c99",
                                "name": "活动数据",
                                "level": 2
                            },
                            {
                                "id": "257e",
                                "name": "发券核券数概览",
                                "level": 2
                            },
                            {
                                "id": "221c",
                                "name": "发券核券详细数据",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "269e",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "463a",
                                "name": "各年龄段发券核券数",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "94c8",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "83d9",
                                "name": "各职业发券核券数",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "bbce",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "c2c5",
                                "name": "学生、新客占比",
                                "level": 2
                            }
                        ]
                    },
                    {
                        "id": "06a9",
                        "name": "其他渠道",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "595e",
                                "name": "异业线下合作渠道",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "681c",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "7868",
                                "name": "微信公众号",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "451f",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "dceb",
                                "name": "Pluto自有渠道",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "a609",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "27f8",
                                "name": "商家自有线上渠道",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "a0f6",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "c462",
                                "name": "京东校园专区",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "84f7",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "fde4",
                                "name": "积分兑券渠道",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "eeb5",
                                        "name": "下载数据",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "9ed5",
                "name": "优惠券核销",
                "level": 1,
                "nodes": [
                    {
                        "id": "5e67",
                        "name": "券码核销",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "aaf8",
                                "name": "京东",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "05a6",
                                        "name": "查询券码",
                                        "level": 3
                                    },
                                    {
                                        "id": "670c",
                                        "name": "核销券码",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "07e7",
                                "name": "Pluto",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "05a5",
                                        "name": "查询券码",
                                        "level": 3
                                    },
                                    {
                                        "id": "70b1",
                                        "name": "核销券码",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "e4a6",
                        "name": "手机号核销",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "08eb",
                                "name": "手机号查询",
                                "level": 3
                            },
                            {
                                "id": "fb72",
                                "name": "会员卡号查询",
                                "level": 3
                            },
                            {
                                "id": "149e",
                                "name": "核销",
                                "level": 3
                            },
                            {
                                "id": "eea8",
                                "name": "批量核销",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "37c1",
                        "name": "核销记录",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "0a62",
                                "name": "手机号搜索",
                                "level": 3
                            },
                            {
                                "id": "ddb7",
                                "name": "会员卡号搜索",
                                "level": 3
                            },
                            {
                                "id": "71db",
                                "name": "操作人搜索",
                                "level": 3
                            },
                            {
                                "id": "7ad3",
                                "name": "核销时间搜索",
                                "level": 3
                            },
                            {
                                "id": "8aa4",
                                "name": "下载数据",
                                "level": 3
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "9264",
        "name": "电子会员",
        "level": 1,
        "nodes": [
            {
                "id": "27f9",
                "name": "会员卡管理",
                "level": 1,
                "nodes": [
                    {
                        "id": "ed67",
                        "name": "支付宝会员卡",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "2b2a",
                                "name": "查看详情",
                                "level": 3
                            },
                            {
                                "id": "671b",
                                "name": "修改",
                                "level": 3
                            },
                            {
                                "id": "2b36",
                                "name": "投放",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "fb82",
                        "name": "微信会员卡",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "7ad0",
                                "name": "查看详情",
                                "level": 3
                            },
                            {
                                "id": "683e",
                                "name": "修改",
                                "level": 3
                            },
                            {
                                "id": "f7f5",
                                "name": "投放",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "e114",
                        "name": "自有会员卡",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "7cfd",
                                "name": "查看详情",
                                "level": 3
                            },
                            {
                                "id": "9ffc",
                                "name": "修改",
                                "level": 3
                            },
                            {
                                "id": "0a5f",
                                "name": "投放",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "3f84",
                        "name": "各会员卡会员数量",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "138d",
                                "name": "支付宝会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "138b",
                                        "name": "查看会员列表",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "cab7",
                                "name": "微信会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "70c0",
                                        "name": "查看会员列表",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "321f",
                                "name": "自有会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "29e1",
                                        "name": "查看会员列表",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "f683",
                "name": "会员储值",
                "level": 1,
                "nodes": [
                    {
                        "id": "29e9",
                        "name": "储值开关",
                        "level": 3
                    },
                    {
                        "id": "bcfe",
                        "name": "编辑规则",
                        "level": 3
                    }
                ]
            }
        ]
    },
    {
        "id": "7410",
        "name": "顾客中心",
        "level": 1,
        "nodes": [
            {
                "id": "p52t",
                "name": "顾客管理",
                "level": 1,
                "nodes": [
                    {
                        "id": "4f68",
                        "name": "全部",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "f6d0",
                                "name": "查看详情",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "9eea",
                        "name": "会员",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "f05f",
                                "name": "全部",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "0fc0",
                                        "name": "查看详情",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "3d51",
                                "name": "支付宝会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "696a",
                                        "name": "查看详情",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "f29e",
                                "name": "微信会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "018f",
                                        "name": "查看详情",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "d3bf",
                                "name": "商户自有会员卡",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "4f6a",
                                        "name": "查看详情",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "479f",
                        "name": "非会员",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "9cd1",
                                "name": "查看详情",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "cabd",
                        "name": "页面功能",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "ffcc",
                                "name": "查询顾客（姓名、手机号、会员卡）",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2dkz",
                "name": "顾客画像",
                "level": 1,
                "nodes": [
                    {
                        "id": "39ad",
                        "name": "性别比例",
                        "level": 2
                    },
                    {
                        "id": "2d93",
                        "name": "交易渠道",
                        "level": 2
                    },
                    {
                        "id": "edd6",
                        "name": "省份分布",
                        "level": 2
                    },
                    {
                        "id": "dce7",
                        "name": "城市分布",
                        "level": 2
                    },
                    {
                        "id": "39d8",
                        "name": "年龄段",
                        "level": 2
                    },
                    {
                        "id": "0eba",
                        "name": "星座",
                        "level": 2
                    },
                    {
                        "id": "cbe3",
                        "name": "出生月份",
                        "level": 2
                    },
                    {
                        "id": "fa7a",
                        "name": "终端分布",
                        "level": 2
                    },
                    {
                        "id": "420d",
                        "name": "是否有手机号",
                        "level": 2
                    },
                    {
                        "id": "f082",
                        "name": "是否是学生",
                        "level": 2
                    }
                ]
            },
            {
                "id": "q9o4",
                "name": "顾客趋势",
                "level": 1
            }
        ]
    },
    {
        "id": "71d3",
        "name": "服务中心",
        "level": 1,
        "nodes": [
            {
                "id": "505e",
                "name": "全部服务",
                "level": 1,
                "nodes": [
                    {
                        "id": "d1f6",
                        "name": "营销中心",
                        "level": 2
                    },
                    {
                        "id": "76f4",
                        "name": "顾客中心",
                        "level": 2
                    },
                    {
                        "id": "860a",
                        "name": "电子会员",
                        "level": 2
                    },
                    {
                        "id": "2dfc",
                        "name": "扫码点餐",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "892e",
                                "name": "开通",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "7fca",
                        "name": "积分兑券",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "16bc",
                                "name": "开通",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "085c",
                        "name": "Pluto商家助手",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "a512",
                                "name": "开通",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "cc0c",
                        "name": "千人千面营销码",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "39bf",
                                "name": "开通",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "adf2",
                "name": "扫码点餐",
                "level": 1,
                "nodes": [
                    {
                        "id": "021d",
                        "name": "菜单管理",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "3df2",
                                "name": "菜品信息",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "3c3d",
                                        "name": "查询菜品名称",
                                        "level": 3
                                    },
                                    {
                                        "id": "5f3b",
                                        "name": "筛选菜品分类",
                                        "level": 3
                                    },
                                    {
                                        "id": "edc7",
                                        "name": "批量导入菜品",
                                        "level": 3
                                    },
                                    {
                                        "id": "b961",
                                        "name": "添加菜品",
                                        "level": 3
                                    },
                                    {
                                        "id": "caf5",
                                        "name": "编辑",
                                        "level": 3
                                    },
                                    {
                                        "id": "2a4b",
                                        "name": "删除",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "2097",
                                "name": "菜品分类",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "a52e",
                                        "name": "分类名称查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "caee",
                                        "name": "添加分类",
                                        "level": 3
                                    },
                                    {
                                        "id": "29fc",
                                        "name": "编辑",
                                        "level": 3
                                    },
                                    {
                                        "id": "d937",
                                        "name": "排序",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "7f3c",
                                "name": "套餐信息",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "bf0c",
                                        "name": "套餐名称查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "37b6",
                                        "name": "添加套餐",
                                        "level": 3
                                    },
                                    {
                                        "id": "cae6",
                                        "name": "编辑",
                                        "level": 3
                                    },
                                    {
                                        "id": "d3fc",
                                        "name": "删除",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "b81a",
                        "name": "桌台管理",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "c81e",
                                "name": "桌台编号查询",
                                "level": 3
                            },
                            {
                                "id": "4b1a",
                                "name": "批量导入桌台",
                                "level": 3
                            },
                            {
                                "id": "15d0",
                                "name": "添加桌台",
                                "level": 3
                            },
                            {
                                "id": "81fc",
                                "name": "点餐桌台二维码下载",
                                "level": 3
                            },
                            {
                                "id": "d1d4",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "d2f2",
                                "name": "删除",
                                "level": 3
                            },
                            {
                                "id": "b868",
                                "name": "体验二维码",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "ac23",
                        "name": "门店设置",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "17c6",
                                "name": "基础信息",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "f5f0",
                                        "name": "编辑",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "4708",
                                "name": "功能开关",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "08fe",
                                        "name": "点餐方式",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "d925",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "83f7",
                                        "name": "选择场景",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "b749",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "a7dc",
                                        "name": "位置校验",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "c835",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "e9db",
                                        "name": "人数收集",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "39de",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "cbd7",
                                        "name": "多语言支持",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "26d7",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "7ee0",
                                        "name": "小犀助手",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "3d9c",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    },
                                    {
                                        "id": "e1ca",
                                        "name": "外带设置",
                                        "level": 2,
                                        "nodes": [
                                            {
                                                "id": "2a6e",
                                                "name": "编辑",
                                                "level": 3
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": "5be4",
                                "name": "位置信息",
                                "level": 2
                            }
                        ]
                    },
                    {
                        "id": "89c4",
                        "name": "订单管理",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "762d",
                                "name": "时间段查询",
                                "level": 3
                            },
                            {
                                "id": "c60a",
                                "name": "订单状态筛选",
                                "level": 3
                            },
                            {
                                "id": "762c",
                                "name": "桌台号查询",
                                "level": 3
                            },
                            {
                                "id": "49d6",
                                "name": "订单号查询",
                                "level": 3
                            },
                            {
                                "id": "3a41",
                                "name": "查看详情",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "46a2",
                "name": "积分商城",
                "level": 1,
                "nodes": [
                    {
                        "id": "292f",
                        "name": "礼品管理",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "677b",
                                "name": "礼品名称查询",
                                "level": 3
                            },
                            {
                                "id": "5d44",
                                "name": "礼品状态筛选",
                                "level": 3
                            },
                            {
                                "id": "d836",
                                "name": "新增商品券",
                                "level": 3
                            },
                            {
                                "id": "ad1b",
                                "name": "新增代金券",
                                "level": 3
                            },
                            {
                                "id": "205b",
                                "name": "追加库存",
                                "level": 3
                            },
                            {
                                "id": "5c2b",
                                "name": "查看详情",
                                "level": 3
                            },
                            {
                                "id": "be06",
                                "name": "下架",
                                "level": 3
                            },
                            {
                                "id": "36b1",
                                "name": "上架",
                                "level": 3
                            },
                            {
                                "id": "5b18",
                                "name": "编辑",
                                "level": 3
                            },
                            {
                                "id": "47a4",
                                "name": "删除",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "050e",
                        "name": "广告装修",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "6c08",
                                "name": "广告列表",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "109a",
                                        "name": "广告名称查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "5c30",
                                        "name": "广告状态筛选",
                                        "level": 3
                                    },
                                    {
                                        "id": "654b",
                                        "name": "新增广告",
                                        "level": 3
                                    },
                                    {
                                        "id": "15f0",
                                        "name": "查看详情",
                                        "level": 3
                                    },
                                    {
                                        "id": "5e7f",
                                        "name": "下架",
                                        "level": 3
                                    },
                                    {
                                        "id": "3b7f",
                                        "name": "上架",
                                        "level": 3
                                    },
                                    {
                                        "id": "f3ea",
                                        "name": "编辑",
                                        "level": 3
                                    },
                                    {
                                        "id": "25d2",
                                        "name": "删除",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "7c75",
                        "name": "兑换查询",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "49f1",
                                "name": "已兑换列表",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "c74a",
                                        "name": "礼品名称查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "5e88",
                                        "name": "手机号查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "b77b",
                                        "name": "兑换时间查询",
                                        "level": 3
                                    },
                                    {
                                        "id": "91fe",
                                        "name": "礼品类型筛选",
                                        "level": 3
                                    },
                                    {
                                        "id": "e0d8",
                                        "name": "导出Excel",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "5eb3",
        "name": "VIP服务",
        "level": 1,
        "nodes": [
            {
                "id": "4a33",
                "name": "活动演示",
                "level": 3
            },
            {
                "id": "1ca1",
                "name": "联系我们",
                "level": 3
            }
        ]
    },
    {
        "id": "60f8",
        "name": "商户中心",
        "level": 1,
        "nodes": [
            {
                "id": "0187",
                "name": "我的账户",
                "level": 1,
                "nodes": [
                    {
                        "id": "be27",
                        "name": "短信账户信息",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "b318",
                                "name": "短信账户设置",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "c7f7",
                        "name": "可用短信条数",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "cf1f",
                                "name": "购买短信",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "b92b",
                        "name": "购买记录",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "510a",
                                "name": "订单号查询",
                                "level": 3
                            },
                            {
                                "id": "2eb1",
                                "name": "订单时间查询",
                                "level": 3
                            },
                            {
                                "id": "be2a",
                                "name": "开发票",
                                "level": 3
                            },
                            {
                                "id": "36ac",
                                "name": "线下汇款-上传凭证",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "37f3",
                "name": "门店管理",
                "level": 1,
                "nodes": [
                    {
                        "id": "be2b",
                        "name": "门店名称搜索",
                        "level": 3
                    },
                    {
                        "id": "fbb1",
                        "name": "门店ID搜索",
                        "level": 3
                    },
                    {
                        "id": "b40f",
                        "name": "门店地址搜索",
                        "level": 3
                    },
                    {
                        "id": "4a3d",
                        "name": "新增门店",
                        "level": 3
                    },
                    {
                        "id": "e91c",
                        "name": "批量导入门店",
                        "level": 3
                    },
                    {
                        "id": "753f",
                        "name": "同步口碑门店",
                        "level": 3
                    },
                    {
                        "id": "983f",
                        "name": "查看详情",
                        "level": 3
                    },
                    {
                        "id": "69a4",
                        "name": "编辑",
                        "level": 3
                    }
                ]
            },
            {
                "id": "d42f",
                "name": "权限管理",
                "level": 1,
                "nodes": [
                    {
                        "id": "5e13",
                        "name": "员工管理",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "0aa6",
                                "name": "员工姓名查询",
                                "level": 3
                            },
                            {
                                "id": "eabc",
                                "name": "门店名称查询",
                                "level": 3
                            },
                            {
                                "id": "03ef",
                                "name": "添加员工",
                                "level": 3
                            },
                            {
                                "id": "5d73",
                                "name": "查看",
                                "level": 3
                            },
                            {
                                "id": "90f8",
                                "name": "修改",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "f5a3",
                        "name": "角色权限",
                        "level": 1,
                        "nodes": [
                            {
                                "id": "6c23",
                                "name": "角色名称查询",
                                "level": 3
                            },
                            {
                                "id": "37f1",
                                "name": "角色设置",
                                "level": 3
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "709b",
        "name": "开放接口",
        "level": 1,
        "nodes": [
            {
                "id": "b421",
                "name": "智能推荐",
                "level": 1,
                "nodes": [
                    {
                        "id": "523e",
                        "name": "管理商户店内个性化服务场景",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "ad2d",
                                "name": "Pluto点餐配置",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "37da",
                                        "name": "配置",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "6c0c",
                                "name": "千人千面营销码",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "317f",
                                        "name": "配置",
                                        "level": 3
                                    },
                                    {
                                        "id": "7f5a",
                                        "name": "查看二维码",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "e94d",
                                "name": "微信公众号推送模板消息",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "5e9e",
                                        "name": "配置",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "3fbe",
                                "name": "推荐内容随支付应答返回",
                                "level": 2
                            },
                            {
                                "id": "b67e",
                                "name": "口碑店铺页",
                                "level": 2
                            },
                            {
                                "id": "4a50",
                                "name": "微信小程序",
                                "level": 2
                            }
                        ]
                    },
                    {
                        "id": "5d81",
                        "name": "开发者自定义店内个性化服务场景",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "5d84",
                                "name": "本场景用到的功能模块",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "4a53",
                                        "name": "修改",
                                        "level": 3
                                    },
                                    {
                                        "id": "439e",
                                        "name": "猜顾客喜欢",
                                        "level": 3
                                    },
                                    {
                                        "id": "26fd",
                                        "name": "热卖榜",
                                        "level": 3
                                    },
                                    {
                                        "id": "6d56",
                                        "name": "广告精准投放",
                                        "level": 3
                                    },
                                    {
                                        "id": "fbda",
                                        "name": "顾客画像",
                                        "level": 3
                                    },
                                    {
                                        "id": "0cf4",
                                        "name": "商品关联推荐",
                                        "level": 3
                                    },
                                    {
                                        "id": "7f64",
                                        "name": "已购推荐",
                                        "level": 3
                                    },
                                    {
                                        "id": "df0b",
                                        "name": "卡券精准营销",
                                        "level": 3
                                    }
                                ]
                            },
                            {
                                "id": "2db3",
                                "name": "本场景调用推荐接口时的公共参数",
                                "level": 2,
                                "nodes": [
                                    {
                                        "id": "02f1",
                                        "name": "复制",
                                        "level": 3
                                    },
                                    {
                                        "id": "59cc",
                                        "name": "重新生成",
                                        "level": 3
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "d633",
                        "name": "了解关于推荐API更多信息",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "6f9f",
                                "name": "如何上传商品信息解释",
                                "level": 3
                            },
                            {
                                "id": "ab11",
                                "name": "API详情",
                                "level": 3
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ef2c",
                "name": "会员权益",
                "level": 1,
                "nodes": [
                    {
                        "id": "e81c",
                        "name": "会员权益接口",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "8d08",
                                "name": "查看接口文档",
                                "level": 3
                            }
                        ]
                    },
                    {
                        "id": "7d30",
                        "name": "调用此列表接口时的公共参数",
                        "level": 2,
                        "nodes": [
                            {
                                "id": "779c",
                                "name": "复制",
                                "level": 3
                            },
                            {
                                "id": "973c",
                                "name": "重新生成",
                                "level": 3
                            }
                        ]
                    }
                ]
            }
        ]
    }
]`;
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
