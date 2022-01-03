import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as Utils from 'src/app/shared/chartjs/Utils';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myChart') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor() { }

  DATA_COUNT = 12;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };

  labels: string[] = [];
  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Wind Speed',
        data: Utils.numbers(this.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      }
    ]
  };

  config: any = {
    type: 'bar',
    data: this.data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
        }
      }
    },
  };

  myChart?: Chart = undefined;

  ngOnInit(): void {
    for (let i = 1; i < 13; i++) {
      this.labels.push('Turbine ' + i.toString());
    }
  }

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (ctx) {
      this.myChart = new Chart(ctx, this.config);
    }
  }

}
