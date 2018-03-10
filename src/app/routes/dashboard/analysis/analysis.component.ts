import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import * as moment from 'moment';

import { CHARTS } from '../../_mock/_chart';

@Component({
    selector: 'app-dashboard-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.less']
})
export class DashboardAnalysisComponent implements OnInit {
    data: any = {
        salesData: [],
        offlineData: []
    };
    loading = true;
    q: any = {
        start: null,
        end: null
    };
    rankingListData: any[] = Array(7).fill({}).map((item, i) => {
        return {
            title: `工专路 ${i} 号店`,
            total: 323234
        };
    });

    constructor(public msg: NzMessageService) {}

    ngOnInit() {
        let res = CHARTS["/chart"];
        res.offlineData.forEach((item: any) => {
            item.chart = Object.assign([], res.offlineChartData);
        });
        this.data = res;
        this.loading = false;
        this.changeSaleType();
    }

    setDate(type: any) {
        const rank = this.getTimeDistance(type);
        this.q.start = rank[0];
        this.q.end = rank[1];
    }

    sort(sortName, sortValue) {
        this.data.searchData = [
            ...(<any[]>this.data.searchData).sort((a, b) => {
                if (a[ sortName ] > b[ sortName ]) {
                    return (sortValue === 'ascend') ? 1 : -1;
                } else if (a[ sortName ] < b[ sortName ]) {
                    return (sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })
        ];
    }

    salesType = 'all';
    salesPieData: any;
    salesTotal = 0;
    changeSaleType() {
        this.salesPieData = this.salesType === 'all' ? this.data.salesTypeData : (
            this.salesType === 'online' ? this.data.salesTypeDataOnline : this.data.salesTypeDataOffline
        );
        if (this.salesPieData) this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }

    handlePieValueFormat(value: any) {
        let digits: number = 2;
        if (typeof value === 'number')
            value = value.toFixed(digits);
        return `&yen ${value}`;
    }

    _activeTab = 0;
    _tabChange(value: any) {
        console.log('tab', this._activeTab, value);
    }

    getTimeDistance(type: 'today' | '-today' | 'week' | '-week' | 'month' | '-month' | 'year' | '-year' | number, time?: moment.MomentInput) {
        if (!time) time = moment(new Date());
        if (!moment.isMoment(time)) time = moment(time);
    
        switch (type) {
            case 'today':
            case '-today':
                return [moment(time), moment(time)];
            case '-week':
                return [moment(time).add(-1, 'week'), moment(time)];
            case 'week':
                return [moment(time), moment(time).add(1, 'week')];
            case 'month':
                return [moment(time).startOf('month'), moment(time).endOf('month')];
            case '-month':
                return [moment(time).subtract(1, 'month').startOf('month'), moment(time).subtract(1, 'month').endOf('month')];
            case 'year':
                return [moment(time).startOf('year'), moment(time).endOf('year')];
            case '-year':
                return [moment(time).subtract(1, 'year').startOf('year'), moment(time).subtract(1, 'year').endOf('year')];
            default:
                return type > 0 ? [moment(time), moment(time).add(type, 'days')] : [moment(time).add(type, 'days'), moment(time)];
        }
    }

}
