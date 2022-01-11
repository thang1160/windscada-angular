import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from '../class/TurbineLog';
import { TurbineService } from '../service/turbine.service';

@Component({
  selector: 'app-site-overview',
  templateUrl: './site-overview.component.html',
  styleUrls: ['./site-overview.component.scss']
})
export class SiteOverviewComponent implements OnInit
// , AfterViewInit, OnDestroy 
{

  constructor(private turbineService: TurbineService) { }

  public overviewList: TurbineLog[] = [];
  private observe: Subscription | undefined;

  socket = webSocket({
    url: "ws://localhost:8888/overview",
    deserializer: (e) => e.data.text()
  });

  ngOnInit(): void {
    this.turbineService.getOverview().subscribe(x => {
      this.overviewList = x;
      this.overviewList.forEach(a => {
        console.log(a);
      });
    })
  }
  ngOnDestroy(): void {
    if (this.observe) {
      this.observe.unsubscribe();
    }
  }

  generateTooltip(value: TurbineLog): string {
    let html = `<table style="width: 100%;">
        <tr class="kpi-row">
            <th>Turbine 1</th>
        </tr>
        <tr class="kpi-row">
            <td class="kpi-value">Power ` + parseFloat(value.power_value).toFixed(2) + ` kW</td>
            <td></td>
        </tr>
        <tr class="kpi-row">
            <td class="kpi-value">Wind Speed `+ parseFloat(value.wind_value).toFixed(2) + ` m/s</td>
        </tr>
    </table>`

    return html
    // return "Status: Online\nPower: " + value.power_value + " kW\nWind Speed: " + value.wind_value + " m/s";
  }

  initSocket() {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: TurbineLog[] = JSON.parse(result);
          console.log("aaaaaaaaaa");
          console.log(array);
          this.overviewList = array;
        }).catch(x => console.error(x))
      });
  }

  ngAfterViewInit(): void {
    this.initSocket();
  }
}
