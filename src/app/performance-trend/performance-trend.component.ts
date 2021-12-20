import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as Utils from '../shared/chartjs/Utils';

@Component({
  selector: 'app-performance-trend',
  templateUrl: './performance-trend.component.html',
  styleUrls: ['./performance-trend.component.scss']
})
export class PerformanceTrendComponent implements OnInit, AfterViewInit {

  @ViewChild('myChart') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;

  // <block:actions:2>
  // actions = [
  //   {
  //     name: 'Randomize',
  //     handler(chart) {
  //       chart.data.datasets.forEach(dataset => {
  //         dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
  //       });
  //       chart.update();
  //     }
  //   },
  // ];
  // </block:actions>

  // <block:setup:1>
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: -100, max: 100 };

  labels = Utils.months({ count: 7 });
  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(this.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: Utils.numbers(this.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: 'y1',
      }
    ]
  };
  // </block:setup>

  // <block:config:0>
  config: any = {
    type: 'line',
    data: this.data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
  };

  myChart?: Chart = undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (ctx) {
      this.myChart = new Chart(ctx, this.config);
    }
  }

  ngOnInit(): void {
    console.log("2" + this.myChart);
  }
}
