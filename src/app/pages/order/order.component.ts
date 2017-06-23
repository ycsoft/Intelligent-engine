import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { ChartDataService } from 'app/services/chart-data.service';
import { Order } from 'app/beans/order';
import { Guid } from 'app/services/guid';
import { Result } from 'app/beans/result';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OrderResource } from 'app/resources/order.resource';
import { ProvinceCityService } from 'app/services/province-city.service';
import { DataResource } from 'app/resources/data.resource';

declare var $: any;

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderResource, ProvinceCityService, DataResource]
})
export class OrderComponent implements OnInit {

    chartlist = [];

    totalMoney = 0;

    chartOption = {};

    order = new Order();

    keywords = '';

    provinces = [];

    cities = [];

    value;

    @ViewChild('orderForm') orderForm: FormControl;

    @ViewChild('invoiceChoice') invoiceChoice: ElementRef;

    constructor(private sessionStorageService: SessionStorageService,
        private chartDataService: ChartDataService,
        private orderResource: OrderResource,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private provinceCityService: ProvinceCityService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.keywords = params['keywords'];
            this.chartlist = this.sessionStorageService.getItem('chartlist');
            this.order.total_amount = this.totalMoney = this.sessionStorageService.getItem('totalMoney');
            this.order.rules = this.sessionStorageService.getItem('rule_ids');
            this.order.order_no = Guid.newGuid();
            this.order.keywords = this.keywords;
            const data = this.chartDataService.getChartData(this.chartlist, true, 0.9);
            this.chartOption = this.getChartOption(data.categories, data.nodes, data.links);
            this.chartlist.forEach(element => {
                // if (!element.free) {
                    const data1 = this.chartDataService.getChartData([element], true, 0.9);

                    const chartOption = this.getChartOption(data1.categories, data1.nodes, data1.links);
                    chartOption.series[0].width = '40%';
                    chartOption.series[0].height = '40%';
                    chartOption.series[0].left = '70%';
                    element.chartOption = chartOption;
                // }
            });

            this.setProvince();
        });
    }

    private setProvince() {
        this.provinceCityService.getProvice().then((provinces: any[]) => {
            this.provinces = provinces;
        });
    }

    private getRuleIds(chartlist) {
        let ids = '';
        chartlist.forEach((element, index) => {
            if (index === chartlist.length - 1) {
                ids += element.rule_id;
            } else {
                ids += element.rule_id + '-';
            }
        });
        return ids;
    }

    private getChartOption(categories, nodes, links) {
        return {
            // tooltip: {},

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
                    roam: true,
                    width: '50%',
                    height: '50%',
                    left: 'center',
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
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

    submitOrder() {
        this.order.total_amount = 0.01;
        const newTab = window.open('about:blank');
        this.orderResource.postOrder(this.order, (result: Result) => {
            // location.href = result.data;
            newTab.location.href = result.data;
            // window.open(result.data, '_blank');
            console.log('url:', result.data);
        });
    }

    search(keywords: string) {
        this.keywords = keywords;
        this.router.navigate(['/result', this.keywords]);
    }

    public selectedProvice(value: any): void {
        this.provinceCityService.getCities(value.text).then((cities: any[]) => {
            this.order.province = value.id;
            this.cities = cities;
        });
    }

    public removedProvice(value: any) {
        console.log('Removed value is: ', value);
        this.cities = [];
    }

    public selectedCity(value: any) {
        this.order.city = value.id;
    }

    public focus() {
        setTimeout(() => {

            $('.result-container1').animate({
                'scrollTop': 1000
            }, 500);
        }, 100);
    }
}
