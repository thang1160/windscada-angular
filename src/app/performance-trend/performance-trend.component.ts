import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';
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
    url: "ws://localhost:8888/performance-trend",
    deserializer: (e) => e.data.text()
  });

  observe: Subscription | undefined;
  DATASET_LABEL = ['Wind Speed', 'Power', 'Capacity Factor', 'Availability']

  data = {
    labels: [],
    datasets: [
      {
        label: this.DATASET_LABEL[0],
        data: [],
        borderColor: Utils.CHART_COLORS.yellow,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
        yAxisID: 'y',
        unit: 'm/s'
      },
      {
        label: this.DATASET_LABEL[1],
        data: [],
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: 'y1',
        unit: 'kW'
      },
      {
        label: this.DATASET_LABEL[2],
        data: [],
        borderColor: Utils.CHART_COLORS.orange,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
        yAxisID: 'y2',
        unit: '%'
      },
      {
        label: this.DATASET_LABEL[3],
        data: [],
        borderColor: Utils.CHART_COLORS.purple,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
        yAxisID: 'y3',
        unit: '%'
      }
    ]
  };

  config: any = {
    type: 'line',
    data: this.data,
    options: {
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
          max: 10,
          ticks: {
            color: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
          },
          grid: {
            color: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
            borderColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
            // tickColor: 'grey'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          max: 22000,
          ticks: {
            color: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          },
          grid: {
            color: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            borderColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            // tickColor: 'grey'
          }
        },
        y2: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 0,
          max: 60,
          ticks: {
            color: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
          },
          grid: {
            color: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
            borderColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
            // tickColor: 'grey'
          }
        },
        y3: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 60,
          max: 120,
          ticks: {
            color: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
          },
          grid: {
            color: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
            borderColor: Utils.transparentize(Utils.CHART_COLORS.purple, 0.5),
            // tickColor: 'grey'
          }
        },
      }
    },
    plugins: [
      {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart: any) => {
          const ctx: CanvasRenderingContext2D = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = '#141414';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }
    ]
  };

  myChart?: Chart = undefined;

  windSpeed: ChartDataset | undefined;
  power: ChartDataset | undefined;
  capFactor: ChartDataset | undefined;
  avalability: ChartDataset | undefined;
  nodeLimit = 50;

  dayOption = [
    { name: '5 Min', value: 1 / 24 / 60 * 5 },
    { name: '10 Min', value: 1 / 24 / 60 * 10 },
    { name: '20 Min', value: 1 / 24 / 60 * 20 },
    { name: '1 Hour', value: 1 / 24 },
    { name: '6 Hour', value: 1 / 24 * 6 },
  ]

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
      this.myChart = new Chart(ctx, this.config);
      this.windSpeed = this.myChart.data.datasets.find(x => x.label == this.DATASET_LABEL[0]);
      this.power = this.myChart.data.datasets.find(x => x.label == this.DATASET_LABEL[1]);
      this.capFactor = this.myChart.data.datasets.find(x => x.label == this.DATASET_LABEL[2]);
      this.avalability = this.myChart.data.datasets.find(x => x.label == this.DATASET_LABEL[3]);
      if (!this.windSpeed || !this.power || !this.capFactor || !this.avalability) {
        alert("init chart failed");
        return;
      }
      this.resume();
    }
  }

  ngOnInit(): void {
    this.refreshChart(this.dayOption[0].value);
  }

  resume() {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: SiteLog[] = JSON.parse(result);
          for (const item of array) {
            this.readLogToChart(item);
          }
          this.myChart?.update();
        })
          .catch(x => console.error(x))
      });
  }

  onChange(event: any) {
    if (this.myChart?.data)
      this.myChart.data.labels = [];
    if (this.windSpeed)
      this.windSpeed.data = [];
    if (this.power)
      this.power.data = [];
    if (this.capFactor)
      this.capFactor.data = [];
    if (this.avalability)
      this.avalability.data = [];
    this.refreshChart(event.value);
  }

  // ex: array with length = 524 can create 524/4=131 node
  // 
  // limit: 100 node on Ox
  // 
  // Need to remove 31 node from chart
  // 
  // => Skip 1 element each 2 until skipped 31*4 element from array
  // 
  // 0 1 2 3 4 5 6 7 8 9 10 11
  // 
  // 0 0 0 0 1 1 1 1 2 2 2  2 => Floor(i / 4)
  // 
  // ^ ^ ^ ^         ^ ^ ^  ^ => Floor(i / 4) % 2 == 0
  refreshChart(day: number) {
    this.performanceService.getHistory(day).subscribe(array => {
      let deleteNode = (array.length / this.DATASET_LABEL.length) - this.nodeLimit;
      let numDeleted = 0;
      let interval = deleteNode < 0 ? 0 : Math.ceil(deleteNode / this.nodeLimit);
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (Math.floor(i / this.DATASET_LABEL.length) % (interval + 1) == 0 || numDeleted == deleteNode * 4) {
          this.readLogToChart(element);
        } else {
          numDeleted++;
        }
      }
      this.myChart?.update();
    })
  }

  readLogToChart(log: SiteLog) {
    let currentChartDataset = null;
    switch (log.name) {
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_V_WIN":
        this.myChart?.data.labels?.push(log.log_time);
        currentChartDataset = this.windSpeed;
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_POWER_MW":
        currentChartDataset = this.power;
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_CAP_FACTOR":
        currentChartDataset = this.capFactor;
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_GE_AVAIL":
        currentChartDataset = this.avalability;
        break;
      default:
        return;
    }
    if (!currentChartDataset) { return; }
    currentChartDataset.data.push(Number.parseFloat(log.value));
    while (currentChartDataset.data.length > this.nodeLimit) {
      currentChartDataset.data.shift();
    }
    if (this.myChart?.data.labels)
      while (this.myChart.data.labels.length > this.nodeLimit) {
        this.myChart.data.labels.shift();
      }
  }
}