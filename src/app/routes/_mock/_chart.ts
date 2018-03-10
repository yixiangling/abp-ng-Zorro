// tslint:disable
import * as moment from "moment";

// region: mock data

const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
			"YYYY-MM-DD"
		),
		y: fakeY[i]
	});
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
	visitData2.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
			"YYYY-MM-DD"
		),
		y: fakeY2[i]
	});
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
	salesData.push({
		x: `${i + 1}月`,
		y: Math.floor(Math.random() * 1000) + 200
	});
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
	searchData.push({
		index: i + 1,
		keyword: `搜索关键词-${i}`,
		count: Math.floor(Math.random() * 1000),
		range: Math.floor(Math.random() * 100),
		status: Math.floor((Math.random() * 10) % 2)
	});
}
const salesTypeData = [
	{
		x: "家用电器",
		y: 4544
	},
	{
		x: "食用酒水",
		y: 3321
	},
	{
		x: "个护健康",
		y: 3113
	},
	{
		x: "服饰箱包",
		y: 2341
	},
	{
		x: "母婴产品",
		y: 1231
	},
	{
		x: "其他",
		y: 1231
	}
];

const salesTypeDataOnline = [
	{
		x: "家用电器",
		y: 244
	},
	{
		x: "食用酒水",
		y: 321
	},
	{
		x: "个护健康",
		y: 311
	},
	{
		x: "服饰箱包",
		y: 41
	},
	{
		x: "母婴产品",
		y: 121
	},
	{
		x: '其他',
		y: 111
	}
];

const salesTypeDataOffline = [
	{
		x: '家用电器',
		y: 99
	},
	{
		x: '个护健康',
		y: 188
	},
	{
		x: '服饰箱包',
		y: 344
	},
	{
		x: '母婴产品',
		y: 255
	},
	{
		x: '其他',
		y: 65
	}
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
	offlineData.push({
		name: `门店${i}`,
		cvr: Math.ceil(Math.random() * 9) / 10
	});
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
	offlineChartData.push({
		x: new Date().getTime() + 1000 * 60 * 30 * i,
		y1: Math.floor(Math.random() * 100) + 10,
		y2: Math.floor(Math.random() * 100) + 10
	});
}

const radarOriginData = [
	{
		name: '个人',
		ref: 10,
		koubei: 8,
		output: 4,
		contribute: 5,
		hot: 7
	},
	{
		name: '团队',
		ref: 3,
		koubei: 9,
		output: 6,
		contribute: 3,
		hot: 1
	},
	{
		name: '部门',
		ref: 4,
		koubei: 1,
		output: 6,
		contribute: 5,
		hot: 7
	}
];

//
const radarData = [];
const radarTitleMap = {
	ref: '引用',
	koubei: '口碑',
	output: '产量',
	contribute: '贡献',
	hot: '热度'
};
radarOriginData.forEach(item => {
	Object.keys(item).forEach(key => {
		if (key !== 'name') {
			radarData.push({
				name: item.name,
				label: radarTitleMap[key],
				value: item[key]
			});
		}
	});
});

// endregion
const tagsListData = [
	{
	  "name": "花莲县",
	  "value": 19,
	  "type": 0
	},
	{
	  "name": "安康市",
	  "value": 30,
	  "type": 1
	},
	{
	  "name": "克孜勒苏柯尔克孜自治州",
	  "value": 59,
	  "type": 1
	},
	{
	  "name": "酒泉市",
	  "value": 49,
	  "type": 1
	},
	{
	  "name": "上海市",
	  "value": 35,
	  "type": 1
	},
	{
	  "name": "西宁市",
	  "value": 74,
	  "type": 1
	},
	{
	  "name": "秦皇岛市",
	  "value": 81,
	  "type": 0
	},
	{
	  "name": "九龙",
	  "value": 46,
	  "type": 2
	},
	{
	  "name": "怀化市",
	  "value": 28,
	  "type": 1
	},
	{
	  "name": "丹东市",
	  "value": 35,
	  "type": 2
	},
	{
	  "name": "怒江傈僳族自治州",
	  "value": 78,
	  "type": 0
	},
	{
	  "name": "香港岛",
	  "value": 88,
	  "type": 0
	},
	{
	  "name": "河池市",
	  "value": 76,
	  "type": 2
	},
	{
	  "name": "北京市",
	  "value": 35,
	  "type": 2
	},
	{
	  "name": "南阳市",
	  "value": 19,
	  "type": 2
	},
	{
	  "name": "巴中市",
	  "value": 55,
	  "type": 0
	},
	{
	  "name": "龙岩市",
	  "value": 63,
	  "type": 1
	},
	{
	  "name": "西宁市",
	  "value": 19,
	  "type": 1
	},
	{
	  "name": "西安市",
	  "value": 47,
	  "type": 1
	},
	{
	  "name": "离岛",
	  "value": 87,
	  "type": 2
	},
	{
	  "name": "天津市",
	  "value": 14,
	  "type": 2
	},
	{
	  "name": "唐山市",
	  "value": 72,
	  "type": 2
	},
	{
	  "name": "海西蒙古族藏族自治州",
	  "value": 98,
	  "type": 0
	},
	{
	  "name": "苏州市",
	  "value": 46,
	  "type": 2
	},
	{
	  "name": "沈阳市",
	  "value": 92,
	  "type": 2
	},
	{
	  "name": "白山市",
	  "value": 25,
	  "type": 0
	},
	{
	  "name": "重庆市",
	  "value": 73,
	  "type": 0
	},
	{
	  "name": "邯郸市",
	  "value": 59,
	  "type": 2
	},
	{
	  "name": "离岛",
	  "value": 14,
	  "type": 0
	},
	{
	  "name": "长沙市",
	  "value": 97,
	  "type": 0
	},
	{
	  "name": "淄博市",
	  "value": 57,
	  "type": 0
	},
	{
	  "name": "怒江傈僳族自治州",
	  "value": 65,
	  "type": 2
	},
	{
	  "name": "重庆市",
	  "value": 24,
	  "type": 0
	},
	{
	  "name": "青岛市",
	  "value": 23,
	  "type": 2
	},
	{
	  "name": "重庆市",
	  "value": 68,
	  "type": 2
	},
	{
	  "name": "德州市",
	  "value": 83,
	  "type": 1
	},
	{
	  "name": "北京市",
	  "value": 44,
	  "type": 0
	},
	{
	  "name": "巴音郭楞蒙古自治州",
	  "value": 15,
	  "type": 1
	},
	{
	  "name": "连云港市",
	  "value": 30,
	  "type": 2
	},
	{
	  "name": "黄石市",
	  "value": 31,
	  "type": 1
	},
	{
	  "name": "松原市",
	  "value": 32,
	  "type": 2
	},
	{
	  "name": "三门峡市",
	  "value": 74,
	  "type": 0
	},
	{
	  "name": "陇南市",
	  "value": 47,
	  "type": 1
	},
	{
	  "name": "咸阳市",
	  "value": 40,
	  "type": 1
	},
	{
	  "name": "天津市",
	  "value": 21,
	  "type": 1
	},
	{
	  "name": "邢台市",
	  "value": 51,
	  "type": 1
	},
	{
	  "name": "铜仁市",
	  "value": 80,
	  "type": 0
	},
	{
	  "name": "南平市",
	  "value": 52,
	  "type": 2
	},
	{
	  "name": "太原市",
	  "value": 6,
	  "type": 0
	},
	{
	  "name": "阿坝藏族羌族自治州",
	  "value": 44,
	  "type": 1
	},
	{
	  "name": "苏州市",
	  "value": 20,
	  "type": 1
	},
	{
	  "name": "银川市",
	  "value": 48,
	  "type": 0
	},
	{
	  "name": "新界",
	  "value": 71,
	  "type": 1
	},
	{
	  "name": "丹东市",
	  "value": 51,
	  "type": 1
	},
	{
	  "name": "张家口市",
	  "value": 2,
	  "type": 2
	},
	{
	  "name": "南宁市",
	  "value": 20,
	  "type": 2
	},
	{
	  "name": "九龙",
	  "value": 8,
	  "type": 2
	},
	{
	  "name": "抚州市",
	  "value": 6,
	  "type": 1
	},
	{
	  "name": "大连市",
	  "value": 76,
	  "type": 1
	},
	{
	  "name": "黄山市",
	  "value": 68,
	  "type": 1
	},
	{
	  "name": "荆州市",
	  "value": 97,
	  "type": 1
	},
	{
	  "name": "香港岛",
	  "value": 57,
	  "type": 2
	},
	{
	  "name": "大理白族自治州",
	  "value": 36,
	  "type": 1
	},
	{
	  "name": "重庆市",
	  "value": 49,
	  "type": 2
	},
	{
	  "name": "鞍山市",
	  "value": 48,
	  "type": 1
	},
	{
	  "name": "临夏回族自治州",
	  "value": 38,
	  "type": 2
	},
	{
	  "name": "厦门市",
	  "value": 67,
	  "type": 2
	},
	{
	  "name": "曲靖市",
	  "value": 59,
	  "type": 1
	},
	{
	  "name": "清远市",
	  "value": 16,
	  "type": 0
	},
	{
	  "name": "北京市",
	  "value": 99,
	  "type": 1
	},
	{
	  "name": "厦门市",
	  "value": 67,
	  "type": 1
	},
	{
	  "name": "天津市",
	  "value": 18,
	  "type": 2
	},
	{
	  "name": "上海市",
	  "value": 74,
	  "type": 0
	},
	{
	  "name": "宁德市",
	  "value": 3,
	  "type": 0
	},
	{
	  "name": "香港岛",
	  "value": 62,
	  "type": 1
	},
	{
	  "name": "焦作市",
	  "value": 46,
	  "type": 2
	},
	{
	  "name": "吕梁市",
	  "value": 70,
	  "type": 1
	},
	{
	  "name": "金华市",
	  "value": 3,
	  "type": 2
	},
	{
	  "name": "来宾市",
	  "value": 55,
	  "type": 2
	},
	{
	  "name": "鄂州市",
	  "value": 14,
	  "type": 1
	},
	{
	  "name": "新竹县",
	  "value": 45,
	  "type": 0
	},
	{
	  "name": "周口市",
	  "value": 79,
	  "type": 2
	},
	{
	  "name": "上海市",
	  "value": 5,
	  "type": 2
	},
	{
	  "name": "喀什地区",
	  "value": 76,
	  "type": 1
	},
	{
	  "name": "九龙",
	  "value": 20,
	  "type": 1
	},
	{
	  "name": "襄阳市",
	  "value": 2,
	  "type": 2
	},
	{
	  "name": "九龙",
	  "value": 44,
	  "type": 1
	},
	{
	  "name": "巴音郭楞蒙古自治州",
	  "value": 43,
	  "type": 1
	},
	{
	  "name": "乌兰察布市",
	  "value": 14,
	  "type": 2
	},
	{
	  "name": "辽源市",
	  "value": 16,
	  "type": 1
	},
	{
	  "name": "贺州市",
	  "value": 31,
	  "type": 1
	},
	{
	  "name": "北京市",
	  "value": 25,
	  "type": 1
	},
	{
	  "name": "山南地区",
	  "value": 94,
	  "type": 0
	},
	{
	  "name": "枣庄市",
	  "value": 82,
	  "type": 1
	},
	{
	  "name": "白城市",
	  "value": 34,
	  "type": 1
	},
	{
	  "name": "济南市",
	  "value": 98,
	  "type": 2
	},
	{
	  "name": "六安市",
	  "value": 64,
	  "type": 1
	},
	{
	  "name": "三亚市",
	  "value": 83,
	  "type": 1
	},
	{
	  "name": "北京市",
	  "value": 13,
	  "type": 1
	},
	{
	  "name": "江门市",
	  "value": 87,
	  "type": 1
	}
  ];

export const CHARTS = {
    '/chart': Object.assign({}, {
        visitData,
        visitData2,
        salesData,
        searchData,
        offlineData,
        offlineChartData,
        salesTypeData,
        salesTypeDataOnline,
        salesTypeDataOffline,
        radarData
    }),
    '/chart/visit': Object.assign([], visitData),
    '/chart/tags': {
		list: tagsListData
	}
};
