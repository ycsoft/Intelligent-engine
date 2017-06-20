import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { ChartDataService } from 'app/services/chart-data.service';
import { Order } from 'app/beans/order';
import { Guid } from 'app/services/guid';
import { Result } from 'app/beans/result';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OrderResource } from 'app/resources/order.resource';
import { ProvinceCityService } from 'app/services/province-city.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderResource, ProvinceCityService]
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
            this.order.rules = this.getRuleIds(this.chartlist);
            this.order.order_no = Guid.newGuid();
            this.order.keywords = this.keywords;
            const data = this.chartDataService.getChartData(this.chartlist);
            this.chartOption = this.getChartOption(data.categories, data.nodes, data.links);
            this.chartlist.forEach(element => {
                const data1 = this.chartDataService.getChartData([element]);
                element.chartOption = this.getChartOption(data1.categories, data1.nodes, data1.links);
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
            tooltip: {},

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
        this.orderResource.postOrder(this.order, (result: Result) => {
            location.href = result.data;
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
}
