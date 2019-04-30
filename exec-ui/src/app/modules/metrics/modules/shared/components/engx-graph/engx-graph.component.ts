import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import  {Chart} from "chart.js"
import {MetricGraphModel} from "../../component-models/metric-graph-model";

@Component({
  selector: 'app-engx-graph',
  templateUrl: './engx-graph.component.html',
  styleUrls: ['./engx-graph.component.scss']
})
export class EngxGraphComponent implements OnInit,OnChanges {
    @Input() public model: MetricGraphModel;


    chart = [];

  constructor() { }

    ngOnInit(){}
    ngOnChanges(changes: SimpleChanges) {
        if (this.model) {
            setTimeout(() => this.buildGraph(), 0);
        }
    }
    protected buildGraph(){

        var d = new Date();
        d.setDate(d.getDate() - 0);
        console.log(d.toString());

        let weatherDates =[];
        var i;
        for(i = 0; i<90 ;i++){

            weatherDates.push(i)

        }
        let RweatherDates = weatherDates.reverse();

        let sca = this.model.values.reverse();
        let SSA = [1, 0, 5, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let RSSA = SSA.reverse();
        let graphData;
        if (sca !== undefined) {
            graphData = [
                ...sca.slice(0, 89).map((x, i) => ({daysAgo: i, issues: x}))
            ];
        }
        console.log(graphData)
        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: RweatherDates,
                datasets: [
                    {
                        data: sca,
                        label: "SCA",
                        borderColor: "#7ED321",
                        backgroundColor:"#7ED321",
                        borderWidth:1,
                        fill: false
                    },
                    {
                        data: RSSA,
                        label:"SSA",
                        borderColor: "#2d49ff",
                        backgroundColor:"#2d49ff",
                        borderWidth:1,
                        fill: false
                    },
                ]
            },
            options: {
                legend: {
                    display: true,
                    usePointStyle:false,
                    position: 'right'
                },

                title: {
                    display: true,
                    fontColor:"$white",
                    position:'top',
                    marginRight:'6px',
                    fontSize: 20,
                    text: 'MEASURABLE QUALITY CHECKS'
                },
                tooltips: {
                    // Disable the on-canvas tooltip
                    enabled: true,
                },
                    scales: {
                    xAxes: [{
                        ticks:{
                            autoSkip:true,
                            maxTicksLimit: 10
                        },
                        display: true,
                        distribution:'linear',
                        scaleLabel: {
                            display: true,
                            labelString: 'Days ago',
                            fontSize:20
                        }

                    }],
                    yAxes: [{
                        ticks:{
                            beginAtZero: true,
                            reverse:false,
                            userCallback: function(label, index, labels) {
                                if (Math.floor(label) === label) {
                                    return label;
                                }

                            }
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of AuditOk',
                            fontSize:20
                        },

                    }],
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        });
    }



}
