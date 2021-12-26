import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as Utils from '../shared/chartjs/Utils';
import { webSocket } from "rxjs/webSocket";
import { Subscription } from 'rxjs';
import { SiteLog } from '../class/SiteLog';
import { PerformanceTrendService } from '../service/performance-trend.service';

@Component({
  selector: 'app-performance-trend',
  templateUrl: './performance-trend.component.html',
  styleUrls: ['./performance-trend.component.scss'],
  providers: [PerformanceTrendService]
})
export class PerformanceTrendComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myChart') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;

  socket = webSocket({
    url: "ws://localhost:8889/performance-trend",
    deserializer: (e) => e.data.text()
  });

  observe: Subscription | undefined;

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

  labels: string[] = [];
  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Wind Speed',
        data: [],
        borderColor: Utils.CHART_COLORS.yellow,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
        yAxisID: 'y',
        unit: 'm/s'
      },
      {
        label: 'Power',
        data: [],
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: 'y1',
        unit: 'kW'
      },
      {
        label: 'Capacity Factor',
        data: [],
        borderColor: Utils.CHART_COLORS.orange,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
        yAxisID: 'y2',
        unit: '%'
      },
      {
        label: 'Availability',
        data: [],
        borderColor: Utils.CHART_COLORS.purple,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
        yAxisID: 'y3',
        unit: '%'
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
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || '';

              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                let value: number = context.parsed.y;
                label += value.toFixed(2).toString() + context.dataset.unit;
              }
              return label;
            }
          }
        }
        // title: {
        //   display: true,
        //   text: 'Chart.js Line Chart - Multi Axis'
        // }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          max: 10
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          max: 22000,
        },
        y2: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 0,
          max: 60
        },
        y3: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 60,
          max: 120,
        },
      }
    },
  };

  myChart?: Chart = undefined;

  constructor(private performanceService: PerformanceTrendService) {
    Chart.register(...registerables);
  }
  ngOnDestroy(): void {
    if (this.observe) {
      this.observe.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (ctx) {
      console.log(this.data.datasets)
      this.myChart = new Chart(ctx, this.config);
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: SiteLog[] = JSON.parse(result);
          console.log(array);
          if (this.myChart) {
            this.labels.push(array[0].log_time);
            let windSpeed = array.find(item => item.name == "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_V_WIN")?.value;
            let power = array.find(item => item.name == "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_POWER_MW")?.value;
            let capacity = array.find(item => item.name == "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_CAP_FACTOR")?.value;
            let availability = array.find(item => item.name == "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_GE_AVAIL")?.value;
            if (windSpeed)
              this.myChart.data.datasets.find(x => x.label == 'Wind Speed')?.data.push(Number.parseFloat(windSpeed));
            if (power)
              this.myChart.data.datasets.find(x => x.label == 'Power')?.data.push(Number.parseFloat(power));
            if (capacity)
              this.myChart.data.datasets.find(x => x.label == 'Capacity Factor')?.data.push(Number.parseFloat(capacity));
            if (availability)
              this.myChart.data.datasets.find(x => x.label == 'Availability')?.data.push(Number.parseFloat(availability));
            this.myChart.update();
          }
        })
          .catch(x => console.error(x))
      });
    }
  }

  ngOnInit(): void {
    this.performanceService.getHistory(5).subscribe(x => {
      console.log(x)
    })
  }
}