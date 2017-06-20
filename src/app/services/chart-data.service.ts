import { Injectable } from '@angular/core';
import { ChartBean } from 'app/beans/chart-bean';
import { Strategy } from "app/beans/strategy";

@Injectable()
export class ChartDataService {

    constructor() { }

    chartData = null;
    /**
     * getCharData
     */
    public getChartData(array: ChartBean[]) {
        const links = [];
        const nodes = [];
        const categories = [{
            name: '选中',
            id: 0
        }, {
            name: '未选中',
            id: 1
        }];
        array.forEach(chartBean => {
            let smallObj = this.isExist(nodes, chartBean.small);
            if (smallObj === undefined) {
                smallObj = {
                    rule_id: chartBean.rule_id,
                    name: chartBean.small,
                    small: chartBean.small,
                    value: chartBean.size,
                    symbolSize: chartBean.size * 40,
                    category: chartBean.free ? 0 : 1,
                    free: chartBean.free,
                    price: chartBean.price,
                    type: 'big',
                    contentSize: 1,
                    size: chartBean.size,
                    label: {
                        normal: {
                            show: true
                        }
                    }
                };
                nodes.push(smallObj);
            } else {
                smallObj.contentSize += 1;
            }
            // const contentObj = {
            //   id: ++index,
            //   name: chartBean.content,
            //   value: 10,
            //   symbolSize: 10,
            //   category: 2,
            //   type: 'content',
            //   label: {
            //     normal: {
            //       show: false
            //     },
            //     emphasis: {
            //       show: false
            //     }
            //   }
            // };
            // const ca = categories.find((element) => element.name === chartBean.big);
            // contentObj.category = ca.id;
            // nodes.push(contentObj);

            // if (this.isExistB(links, bigObj.id, smallObj.id) === undefined) {
            //   links.push({
            //     id: ++index1,
            //     source: bigObj.id,
            //     target: smallObj.id
            //   });
            // }
            // if (this.isExistB(links, smallObj.id, contentObj.id) === undefined) {
            //   links.push({
            //     id: ++index1,
            //     source: smallObj.id,
            //     target: contentObj.id
            //   });
            // }
        });
        console.log('links:', links);
        console.log('nodes:', nodes);
        this.chartData = {
            links: links,
            nodes: nodes,
            categories: categories
        };
        return this.chartData;
    }

    public getFree(array: ChartBean[]) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].free) {
                const free = array[i];
                const freeNode = this.chartData.nodes.find((element) => element.rule_id === free.rule_id);
                free.name = free.small;
                free.checked = true;
                free.contentSize = freeNode.contentSize;
                for (let j = 0; j < free.strategy.length; j++) {
                    if (free.strategylist === undefined) {
                        free.strategylist = [];
                    }
                    const strategy = free.strategylist.find((element: Strategy) => element.main === free.strategy[j].main);
                    if (strategy === undefined) {
                        free.strategylist.push({
                            main: free.strategy[j].main,
                            list: [{
                                sub: free.strategy[j].sub,
                                manner: free.strategy[j].manner
                            }]
                        });
                    } else {
                        strategy.list.push({
                            sub: free.strategy[j].sub,
                            manner: free.strategy[j].manner
                        });
                    }
                }
                return free;
            }
        }
        return <ChartBean>{};
    }

    private isExist(array: any, name) {
        return array.find((element) => {
            return element.name === name;
        });
    }

    private isExistB(array: any, source, target) {
        return array.find((element) => {
            return element.source === source && element.target === target;
        });
    }
}
