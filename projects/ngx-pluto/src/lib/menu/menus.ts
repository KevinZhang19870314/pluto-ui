import { PLATFORMURLLIST } from './platform-url'

// All menus, will mapping backend permission ids to display filtered menus
export const MENUS = `[{
	‘id‘: ‘02f9‘,
	‘displayName‘: ‘主页‘,
	‘iconName‘: ‘fa fa-home fa-fw‘,
	‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/home‘,
	‘routeName‘: [‘home‘, ‘case‘],
	‘children‘: []
},
{
	‘id‘: ‘b448‘,
	‘displayName‘: ‘营销中心‘,
	‘iconName‘: ‘fa fa-flag fa-fw‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘a118‘,
		‘displayName‘: ‘创建新活动‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/activity/channel‘,
		‘routeName‘: [‘activity.channel‘, ‘activity.create‘, ‘activity.discount‘, ‘activity.consumeSend‘],
		‘children‘: []
	},
	{
		‘id‘: ‘e2d6‘,
		‘displayName‘: ‘活动管理‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/activity/management‘,
		‘routeName‘: [‘activity.management‘, ‘activity.channel‘, ‘activity.coupon‘, ‘activity.weixin‘,
						‘activity.hi‘, ‘activity.laobi‘, ‘activity.registration‘, ‘activity.share‘,
						‘activity.birthday‘, ‘activity.face‘, ‘activity.jdDetail‘, ‘activity.jd‘],
		‘children‘: []
	},
	{
		‘id‘: ‘dc4f‘,
		‘displayName‘: ‘精准投放‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/interests/provide‘,
		‘routeName‘: [‘interests.provide‘, ‘interests.memberDetail‘, ‘interests.send‘, ‘interests.detail‘],
		‘children‘: []
	},
	{
		‘id‘: ‘7476‘,
		‘displayName‘: ‘营销统计‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/activity/statistics‘,
		‘routeName‘: [‘activity.statistics‘, ‘activity.channelStatistics‘],
		‘children‘: []
	},
	{
		‘id‘: ‘9ed5‘,
		‘displayName‘: ‘优惠券核销‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/activity/verify‘,
		‘routeName‘: [‘activity.verify‘],
		‘children‘: []
	}]
},
{
	‘id‘: ‘9264‘,
	‘displayName‘: ‘电子会员‘,
	‘iconName‘: ‘fa fa-id-card‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘27f9‘,
		‘displayName‘: ‘会员卡管理‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/membercard/management/create‘,
		‘routeName‘: [‘membercard.management.create‘, ‘membercard.management.alp‘, ‘membercard.management.alpDetail‘,
						‘membercard.management.wxp‘, ‘membercard.management.wxpDetail‘, ‘membercard.management.np‘,
						‘membercard.management.npDetail‘],
		‘children‘: []
	},
	{
		‘id‘: ‘f683‘,
		‘displayName‘: ‘会员储值‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘‘,
		‘children‘: [{
			‘id‘: ‘29e9‘,
			‘displayName‘: ‘储值规则‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/membercard/balance/rule‘,
			‘routeName‘: [‘membercard.balance.rule‘],
			‘children‘: []
		},
		{
			‘id‘: ‘bcfe‘,
			‘displayName‘: ‘储值记录‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/membercard/balance/management‘,
			‘routeName‘: [‘membercard.balance.management‘],
			‘children‘: []
		}]
	}]
},
{
	‘id‘: ‘7410‘,
	‘displayName‘: ‘顾客中心‘,
	‘iconName‘: ‘fa fa-user fa-fw‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘p52t‘,
		‘displayName‘: ‘顾客管理‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/customer/manage‘,
		‘routeName‘: [‘customer.manage‘, ‘customer.detail‘],
		‘children‘: []
	},
	{
		‘id‘: ‘2dkz‘,
		‘displayName‘: ‘顾客画像‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/customer/portrait‘,
		‘routeName‘: [‘customer.portrait‘],
		‘children‘: []
	},
	{
		‘id‘: ‘q9o4‘,
		‘displayName‘: ‘顾客趋势‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/customer/trend‘,
		‘routeName‘: [‘customer.trend‘],
		‘children‘: []
	}]
},
{
	‘id‘: ‘71d3‘,
	‘displayName‘: ‘服务中心‘,
	‘iconName‘: ‘fa fa-user-cog fa-fw‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘505e‘,
		‘displayName‘: ‘全部服务‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/service-center‘,
		‘routeName‘: [‘service-center‘],
		‘children‘: []
	},
	{
		‘id‘: ‘adf2‘,
		‘displayName‘: ‘扫码点餐‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘‘,
		‘children‘: [{
			‘id‘: ‘021d‘,
			‘displayName‘: ‘菜单管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/order/menu‘,
			‘routeName‘: [‘order.menu‘],
			‘children‘: []
		},
		{
			‘id‘: ‘b81a‘,
			‘displayName‘: ‘桌台管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/order/tables‘,
			‘routeName‘: [‘order.tables‘],
			‘children‘: []
		},
		{
			‘id‘: ‘ac23‘,
			‘displayName‘: ‘门店设置‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/order/merInfo‘,
			‘routeName‘: [‘order.merInfo‘],
			‘children‘: []
		},
		{
			‘id‘: ‘89c4‘,
			‘displayName‘: ‘订单管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/order/manage‘,
			‘routeName‘: [‘order.manage‘, ‘order.detail‘],
			‘children‘: []
		}]
	},
	{
		‘id‘: ‘46a2‘,
		‘displayName‘: ‘积分商城‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘‘,
		‘children‘: [{
			‘id‘: ‘292f‘,
			‘displayName‘: ‘礼品管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/scoremall/management?channel=9‘,
			‘routeName‘: [‘scoremall.management‘, ‘scoremall.discount‘],
			‘children‘: []
		},
		{
			‘id‘: ‘050e‘,
			‘displayName‘: ‘广告管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/scoremall/management?channel=10‘,
			‘routeName‘: [‘scoremall.management‘, ‘scoremall.ad‘],
			‘children‘: []
		},
		{
			‘id‘: ‘7c75‘,
			‘displayName‘: ‘兑换查询‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.VOUCHER_URL}#/scoremall/history‘,
			‘routeName‘: [‘scoremall.history‘],
			‘children‘: []
		}]
	},
	{
		‘id‘: ‘8rsu‘,
		‘displayName‘: ‘员工拓客‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.TASTY_URL}#/customer-extension‘,
		‘routeName‘: [‘customer-extension‘],
		‘children‘: []
	}]
},
{
	‘id‘: ‘5eb3‘,
	‘displayName‘: ‘VIP服务‘,
	‘iconName‘: ‘fas fa-gem fa-fw‘,
	‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/account/vipServices‘,
	‘routeName‘: [‘vipServices‘],
	‘children‘: []
},
{
	‘id‘: ‘60f8‘,
	‘displayName‘: ‘商户中心‘,
	‘iconName‘: ‘fas fa-store fa-fw‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘0187‘,
		‘displayName‘: ‘我的账户‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/merchant/accountCenter‘,
		‘routeName‘: [‘merchant-accountCenter‘, ‘merchant-purchaseSmsWizard‘],
		‘children‘: []
	},
	{
		‘id‘: ‘37f3‘,
		‘displayName‘: ‘门店管理‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/store/query‘,
		‘routeName‘: [‘store-query‘, ‘store-add‘, ‘store-detail‘],
		‘children‘: []
	},
	{
		‘id‘: ‘d42f‘,
		‘displayName‘: ‘权限管理‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘‘,
		‘children‘: [{
			‘id‘: ‘5e13‘,
			‘displayName‘: ‘员工管理‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/privilege/employees‘,
			‘routeName‘: [‘template.privilege.employees‘],
			‘children‘: []
		},
		{
			‘id‘: ‘f5a3‘,
			‘displayName‘: ‘角色权限‘,
			‘iconName‘: ‘‘,
			‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/privilege/roles‘,
			‘routeName‘: [‘template.privilege.roles‘],
			‘children‘: []
		}]
	}]
},
{
	‘id‘: ‘709b‘,
	‘displayName‘: ‘开放接口‘,
	‘iconName‘: ‘fa fa-cog‘,
	‘route‘: ‘‘,
	‘children‘: [{
		‘id‘: ‘b421‘,
		‘displayName‘: ‘智能推荐‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.SKIPTONEUSTAR_URL}#/recommend/dev‘,
		‘routeName‘: [‘recommend.dev‘, ‘recommend.manage‘, ‘recommend.product‘, ‘recommend.custom‘, ‘recommend.customDev‘,
						‘recommend.productDev‘, ‘recommend.select‘],
		‘children‘: []
	},
	{
		‘id‘: ‘ef2c‘,
		‘displayName‘: ‘会员权益‘,
		‘iconName‘: ‘‘,
		‘route‘: ‘${PLATFORMURLLIST.AUTH_URL}#/setting/memberbenifit‘,
		‘routeName‘: [‘setting-memberbenifit‘],
		‘children‘: []
	}]
}]`;
