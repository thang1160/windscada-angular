import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from 'src/app/class/TurbineLog';
import * as Utils from 'src/app/shared/chartjs/Utils';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myChart') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;

  socket = webSocket({
    url: "ws://localhost:8888/bar-graph",
    deserializer: (e) => e.data.text()
  });

  logTypeOption = [
    { name: 'Wind Speed', value: 'WIND SPEED', unit: 'm/s' },
    { name: 'Power', value: 'POWER (KW)', unit: 'kW' },
    { name: 'Generator Speed', value: 'GENERATOR SPEED', unit: 'rpm' },
    { name: 'Rotor Speed', value: 'ROTOR SPEED', unit: 'rpm' },
  ]

  selectedLogType: {
    name: string,
    value: string,
    unit: string
  } = this.logTypeOption[0];

  constructor() { }
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.unsubscribe();
    }
  }

  labels: string[] = [];
  data = {
    labels: this.labels,
    datasets: [
      {
        label: this.selectedLogType.name,
        data: [],
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        unit: this.selectedLogType.unit
      }
    ]
  };

  config: any = {
    type: 'bar',
    data: this.data,
    options: {
      responsive: true,
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
      },
    },
  };

  myChart?: Chart = undefined;

  ngOnInit(): void {
    for (let i = 1; i < 13; i++) {
      this.labels.push('Turbine ' + i.toString());
    }
    this.socket.subscribe((data: Promise<string>) => {
      data.then(result => {
        let array: TurbineLog[] = JSON.parse(result);
        if (this.myChart?.data?.datasets[0]) {
          this.myChart.data.datasets[0].data = array.filter(x => x.name == this.selectedLogType.value).map(x => parseFloat(x.value));
          this.myChart.update();
        }
      })
        .catch(x => console.error(x))
    });
  }

  onChange(event: any) {
    if (this.myChart?.data?.datasets[0]) {
      this.myChart.data.datasets[0].data = [];
      this.myChart.data.datasets[0].label = event.value.name;
      (this.myChart.data.datasets[0] as any).unit = event.value.unit;
      this.myChart.update();
    }
  }

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (ctx) {
      this.myChart = new Chart(ctx, this.config);
    }
  }

}
