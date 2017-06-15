import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { ChartDataService } from 'app/services/chart-data.service';
import { Order } from 'app/beans/order';
import { OrderService } from 'app/resources/order.service';
import { Guid } from 'app/services/guid';
import { Result } from 'app/beans/result';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderService]
})
export class OrderComponent implements OnInit {

    chartlist = [];

    totalMoney = 0;

    chartOption = {};

    order = new Order();

    keywords = '';

    @ViewChild('orderForm') orderForm: FormControl;

    constructor(private sessionStorageService: SessionStorageService,
        private chartDataService: ChartDataService,
        private orderService: OrderService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.keywords = params['keywords'];
        });

        this.chartlist = this.sessionStorageService.getItem('chartlist');
        this.order.total_amount = this.totalMoney = this.sessionStorageService.getItem('totalMoney');
        this.order.rules = this.getRuleIds(this.chartlist);
        this.order.order_no = Guid.newGuid();
        const data = this.chartDataService.getChartData(this.chartlist, 10);
        this.chartOption = this.getChartOption(data.categories, data.nodes, data.links);
        this.chartlist.forEach(element => {
            const data1 = this.chartDataService.getChartData([element], 10);
            element.chartOption = this.getChartOption(data1.categories, data1.nodes, data1.links);
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
        this.orderService.postOrder(this.order, (result: Result) => {
            location.href = result.data;
            console.log('url:', result.data);
        });
    }

    search(keywords: string) {
        this.keywords = keywords;
        this.router.navigate(['/result', this.keywords]);
    }

    submitValid() {
        if (this.order.invoice) {
            return this.orderForm.invalid;
        } else {
            return this.orderForm['controls'].email.invalid;
        }
    }
}
