import { Injectable } from '@angular/core';
import { ChartBean } from 'app/beans/chart-bean';
import { Strategy } from 'app/beans/strategy';
import { SmallTypeColorService } from 'app/services/small-type-color.service';

@Injectable()
export class ChartDataService {

    chartData = null;

    constructor(private smallTypeColorService: SmallTypeColorService) { }

    /**
     * getCharData
     */
    public getChartData(array: ChartBean[], isSelected = false, ratio = 1) {
        const links = [];
        const nodes = [];
        const categories = [];
        let index = -1;
        // categories.push({
        //     name: '选中',
        //     id: ++index,
        //     itemStyle: {
        //         normal: {
        //             color: this.smallTypeColorService.getColor('选中').color
        //         }
        //     }
        // });
        array.forEach(chartBean => {
            let smallObj = this.isExist(nodes, chartBean.small);
            if (smallObj === undefined) {
                // categories.push({
                //     name: chartBean.small,
                //     id: ++index,
                //     itemStyle: {
                //         normal: {
                //             color: this.smallTypeColorService.getColor(chartBean.small).color
                //         }
                //     }
                // });
                smallObj = {
                    id: ++index,
                    rule_id: chartBean.rule_id,
                    name: chartBean.small,
                    small: chartBean.small,
                    value: chartBean.size,
                    symbolSize: this.getSize(chartBean.size * ratio),
                    // category: index,
                    free: chartBean.free,
                    price: chartBean.price,
                    type: 'small',
                    contentSize: 1,
                    size: chartBean.size,
                    selected: isSelected,
                    content: chartBean.content,
                    hasFree: chartBean.free,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: this.smallTypeColorService.getColor(chartBean.small).color,
                        }
                    }
                };
                nodes.push(smallObj);
            } else {
                if (!chartBean.free) {
                    smallObj.rule_id = chartBean.rule_id;
                    smallObj.content = '';
                    smallObj.free = chartBean.free;
                } else {
                    smallObj.hasFree = 1;
                }
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
        // console.log('links:', links);
        // console.log('nodes:', nodes);
        const free = array.find((element) => element.free);
        if (free) {
            const contentObj = {
                id: ++index,
                rule_id: free.rule_id,
                name: `${free.content}(免费)`,
                small: free.small,
                value: free.size,
                symbolSize: 10,
                // category: index,
                free: free.free,
                price: free.price,
                type: 'content',
                contentSize: 0,
                size: free.size,
                selected: true,
                content: free.content,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: this.smallTypeColorService.getColor(free.small).color,
                    }
                }
            };
            const small = nodes.find((element) => element.small === contentObj.small);
            nodes.push(contentObj);
            links.push({
                source: small.id,
                target: contentObj.id,
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            });
        }

        this.chartData = {
            links: links,
            nodes: nodes,
            categories: categories
        };
        console.log('chartData: ', this.chartData);
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

    private getSize(x: number, ratio = 1) {
        return (10 + Math.exp(10 * (1.3 * x - 0.9))) * ratio;
        // return Math.pow(Math.E, 5 * (x-0.2));
        // return 67.1121 * x * x - 9.7788 * x + 6.2160;
    }
}
