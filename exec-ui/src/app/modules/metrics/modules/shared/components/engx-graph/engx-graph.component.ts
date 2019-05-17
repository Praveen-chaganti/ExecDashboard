import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import  {Chart} from "chart.js"
import {LobGraphModel} from "../../component-models/lob-graph-model";

@Component({
  selector: 'app-engx-graph',
  templateUrl: './engx-graph.component.html',
  styleUrls: ['./engx-graph.component.scss']
})
export class EngxGraphComponent implements OnInit,OnChanges {
    @Input() public model: LobGraphModel;
     /*Peer_Review = this.model.values.get("CODE_REVIEW").reverse();
     SCA = this.model.values.get("CODE_QUALITY").reverse()
     FEATURE_TEST = this.model.values.get("TEST_RESULT").reverse()
     APPSEC = this.model.values.get("STATIC_SECURITY_ANALYSIS").reverse()
     OSS = this.model.values.get("LIBRARY_POLICY").reverse()
     PT = this.model.values.get("PERF_TEST").reverse();
*/

    chart = [];
    constructor() { }

    ngOnInit(){}
    ngOnChanges(changes: SimpleChanges) {
        if (this.model) {
            this.model.valueLabel.forEach(value =>{
                var dataset = this.getDataSet(value)
                setTimeout(() => this.buildGraph(value,dataset), 0);
            })
        }
    }
    protected getDataSet(value){

        if(value === "MEASURABLE QUALITY CHECKS"){
            let dataset = [
                {
                    data: this.model.values.get("CODE_QUALITY").reverse(),
                    label: "SCA",
                    borderColor: "#d32451",
                    fontColor:"#FFFFFF",
                    backgroundColor:"#d3306b",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#d31e48',
                    fill: false
                },
                {
                    data: this.model.values.get("TEST_RESULT").reverse(),
                    label: "Feature_Test",
                    borderColor: "#feff0e",
                    fontColor:"#FFFFFF",
                    backgroundColor:"#feff0e",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#feff0e',
                    fill: false
                },
                {
                    data:this.model.values.get("PERF_TEST").reverse(),
                    label: "PT",
                    borderColor: "#ef24ff",
                    fontColor:"#FFFFFF",
                    backgroundColor:"#ef24ff",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#ef24ff',
                    fill: false
                }
            ]
            return dataset;
        }else if(value === 'MEASURABLE SOURCE CONTROL'){
            let dataset = [
                {
                    data: this.model.values.get("CODE_REVIEW").reverse(),
                    label: "Peer_Review",
                    borderColor: "#7ED321",
                    fontColor:"#FFFFFF",
                    backgroundColor:"#7ED321",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#7ED321',
                    fill: false
                }
            ]
            return dataset;
        } else {
            let dataset =[
                {
                    data: this.model.values.get("STATIC_SECURITY_ANALYSIS").reverse(),
                    label:"APPSEC",
                    borderColor: "#2d49ff",
                    backgroundColor:"#2d49ff",
                    fontColor:"#FFFFFF",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#2d49ff',
                    fill: false
                },
                {
                    data:this.model.values.get("LIBRARY_POLICY").reverse(),
                    label:"OSS",
                    borderColor: "#13ffa2",
                    backgroundColor:"#13ffa2",
                    fontColor:"#FFFFFF",
                    borderWidth:1,
                    pointStyle: 'star',
                    pointRadius: 2,
                    pointBorderColor: '#13ffa2',
                    fill: false
                }
            ]
            return dataset;
        }

    }

    protected buildGraph(value,dataset){

        var d = new Date();
        d.setDate(d.getDate() - 0);
        console.log(d.toString());

        let weatherDates =[];

        for( var i = 0; i<90 ;i++){
            var d = new Date();
            d.setDate(d.getDate() - i);
            var month = d.getUTCMonth() + 1;
            var day = d.getUTCDate();
            var newDate = month + "/" + day;
            weatherDates.push(newDate)
        }
        let RweatherDates = weatherDates.reverse();


        this.chart = new Chart(value, {
            type: 'line',
            data: {
                labels: RweatherDates,
                datasets: dataset
            },
            options: {
                legend: {
                    display: true,
                    usePointStyle:false,
                    position: 'right',
                    labels: {
                        fontFamily: "Comic Sans MS",
                        fontColor:"#FFFFFF",
                        boxWidth: 10,
                        boxHeight: 2
                    },
                    pointStyle:'cross'
                },

                title: {
                    fontColor:"#FFFFFF",
                    position:'top',
                    marginRight:'6px',
                    fontSize: 18,
                },
                tooltips: {
                    // Disable the on-canvas tooltip
                    enabled: true,
                },
                scales: {
                    xAxes: [{
                        ticks:{
                            autoSkip:true,
                            minRotation:40,
                            maxTicksLimit:4,
                            isAvoidFirstLastClippingEnabled:true

                        },
                        display: true,
                        distribution:'linear',

                        scaleLabel: {
                            display: true,
                            //labelString: 'Days ago',
                            fontSize:20,
                            paddingTop:4
                        }

                    }],
                    yAxes: [{
                        ticks:{
                            beginAtZero: true,
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
                            fontColor:"#FFFFFF",
                            fontSize:18
                        },

                    }],
                },
                layout: {
                    padding: {
                        left: 25,
                        right: 30,
                        top: 20,
                        bottom: 10
                    }
                }
            }
        });
    }
}
