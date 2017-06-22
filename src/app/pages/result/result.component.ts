import { Component, OnInit, state, style, transition, animate, trigger, ViewChild } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { ChartDataService } from 'app/services/chart-data.service';
import { Result } from 'app/beans/result';
import { ChartBean } from 'app/beans/chart-bean';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'app/services/session-storage.service';
import { SearchResource } from 'app/resources/search.resource';
import { SmallTypeColorService } from 'app/services/small-type-color.service';

@Component({
    selector: 'app-result-component',
    templateUrl: 'result.component.html',
    styleUrls: ['result.component.scss'],
    providers: [SearchResource],
    animations: [
        trigger('resultState', [
            state('inactive', style({
                width: '22px'
            })),
            state('active', style({
                width: '33%'
            })),
            transition('inactive => active', [animate('300ms ease-in')]),
            transition('active => inactive', [animate('300ms ease-out')])
        ]),
        trigger('reportState', [
            state('state1', style({
                transform: 'translateX(0)'
            })),
            state('state2', style({
                transform: 'translateX(150px)'
            })),
            transition('state1 <=> state2', animate('100ms ease-in-out'))
        ]),
        trigger('contentState', [
            state('state1', style({
                transform: 'translateX(-100%)',
                display: 'none'
            })),
            state('state2', style({
                transform: 'translateX(0)',
                display: 'block'
            })),
            state('state3', style({
                transform: 'translateX(100%)',
                display: 'none'
            })),
            transition('state1 <=> state2', animate('200ms ease-in-out')),
            transition('state2 <=> state3', animate('200ms ease-in-out'))
        ])
    ]
})
export class ResultComponent implements OnInit {

    isHidden = true;

    resultState = 'active';

    reportState = 'state1';

    contentPage1State = 'state2';

    contentPage2State = 'state3';

    currentPageNumber = 1;

    echartsIntance = null;

    totalItems = 124;

    currentPage = 4;

    isCheckAll = false;

    type = 'type1';

    chartOption = null;

    freeOne: ChartBean = <ChartBean>{};

    chartlist = [];

    totalMoney = 0;

    keywords = '';

    result = null;

    constructor(private dataService: DataService,
        private chartDataService: ChartDataService,
        private searchResource: SearchResource,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sessionStorageService: SessionStorageService,
        private smallTypeColorService: SmallTypeColorService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.keywords = params['keywords'];
            // this.dataService.search(this.keywords).then((result) => {
            //     const data = this.chartDataService.getChartData(result);
            //     this.freeOne = this.chartDataService.getFree(result);
            //     this.setChartOption(data.categories, data.nodes, data.links);
            //     this.chartlist.push(this.freeOne);
            // });
            this.search(this.keywords);
        });
    }

    private setChartOption(categories, nodes, links) {
        this.chartOption = {
            // title: {
            //     text: 'Les Miserables',
            //     subtext: 'Circular layout',
            //     top: 'bottom',
            //     left: 'right'
            // },
            // tooltip: {},
            // legend: [{
            //     // selectedMode: 'single',
            //     data: categories.map(function (a) {
            //         return a.name;
            //     })
            // }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: nodes,
                    links: links,
                    categories: categories,
                    roam: true,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}',
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };
    }

    onChartInit(ec) {
        this.echartsIntance = ec;
    }

    resizeChart() {
        if (this.echartsIntance) {
            this.echartsIntance.resize();
        }
    }

    onChartClick(event) {
        if (typeof event.seriesIndex === 'undefined') {
            return;
        }
        if (event.type === 'click') {
            event.data.selected = !event.data.selected;
            event.data.itemStyle.normal.color = event.data.selected ?
                this.smallTypeColorService.getColor(event.data.small).color : '#cccccc';
            this.addOrRemoveInCharList(event.data);
            this.resizeChart();
            this.getTotalMoney();
        }
    }

    private addOrRemoveInCharList(obj) {
        let isExist = false;
        for (let i = 0; i < this.chartlist.length; i++) {
            if (this.chartlist[i].rule_id === obj.rule_id) {
                this.chartlist.splice(i, 1);
                isExist = true;
                break;
            }
        }
        if (isExist === false) {
            obj.selected = true;
            this.chartlist.push(obj);
        }
    }

    changeReulstState() {
        if (this.resultState === 'active') {
            this.resultState = 'inactive';
        } else {
            this.resultState = 'active';
        }
        setTimeout(() => {
            this.resizeChart();
        }, 100);
    }

    setPage(pageNo: number): void {
        this.currentPage = pageNo;
    }

    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }

    changeContentPage(index: number) {
        if (this.currentPageNumber < index) {
            this['contentPage' + this.currentPageNumber + 'State'] = 'state1';
            this['contentPage' + index + 'State'] = 'state2';
        } else if (this.currentPageNumber > index) {
            this['contentPage' + this.currentPageNumber + 'State'] = 'state3';
            this['contentPage' + index + 'State'] = 'state2';
        }
        this.currentPageNumber = index;
    }


    search(keywords: string) {
        this.keywords = keywords;
        if (this.keywords) {
            this.searchResource.search({ keywords: keywords }, (result: Result) => {
                // console.log('searchResult:', result);
            }).$observable.subscribe((result: Result) => {
                this.result = result;
                this.type = 'type1';
                this.chartlist.length = 0;
                const data = this.chartDataService.getChartData(result.data);
                this.freeOne = this.chartDataService.getFree(result.data);
                this.setChartOption(data.categories, data.nodes, data.links);
                // this.chartlist.push(this.freeOne);
            });
        }
    }

    private getTotalMoney() {
        this.totalMoney = 0;
        this.chartlist.forEach(element => {
            if (element.selected) {
                this.totalMoney += element.price * (element.contentSize - element.free);
            }
        });
    }

    checked(element) {
        element.selected = !element.selected;
        if (element.selected === false) {
            this.addOrRemoveInCharList(element);
        }
        const series = this.chartOption.series[0];
        const ele1 = series.data.find((ele) => ele.rule_id === ele.rule_id);
        if (ele1) {
            ele1.selected = element.selected;
            this.setChartOption(series.categories, series.data, series.links);
            this.resizeChart();
        }
        this.getTotalMoney();
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
        const series = this.chartOption.series[0];
        this.chartlist = [];
        if (this.isCheckAll) {
            series.data.forEach(element => {
                element.selected = true;
                element.itemStyle.normal.color = element.selected ?
                    this.smallTypeColorService.getColor(element.small).color : '#cccccc';
                this.chartlist.push(element);
            });
        } else {
            series.data.forEach(element => {
                element.selected = false;
                element.itemStyle.normal.color = element.selected ?
                    this.smallTypeColorService.getColor('选中').color : this.smallTypeColorService.getColor(element.small).color;
            });
        }
        this.setChartOption(series.categories, series.data, series.links);
        this.resizeChart();
        this.getTotalMoney();
    }

    toPay() {
        this.sessionStorageService.setItem('chartlist', this.filterChecked(this.chartlist));
        this.sessionStorageService.setItem('totalMoney', this.totalMoney);
        this.router.navigate(['/order', this.keywords]);
    }

    filterChecked(chartlist) {
        const array = [];
        chartlist.forEach(element => {
            if (element.selected) {
                array.push(element);
            }
        });
        return array;
    }
}
