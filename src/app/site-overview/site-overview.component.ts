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
    url: "ws://localhost:8889/overview",
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
        <tr class="tooltip-row">
            <th>Turbine `+ value.turbine_id + `</th>
            <th></th>
            <th></th>
        </tr>
        <tr class="tooltip-row">
            <td>Power</td>
            <td style="text-align: right;">` + parseFloat(value.power_value).toFixed(2) + `</td>
            <td>kW</td>
        </tr>
        <tr class="tooltip-row">
            <td>Wind Speed</td>
            <td style="text-align: right;">` + parseFloat(value.wind_value).toFixed(2) + `</td>
            <td>m/s</td>
        </tr>
        <tr class="tooltip-row">
            <td>Generate Speed</td>
            <td style="text-align: right;">` + parseFloat(value.gen).toFixed(2) + `</td>
            <td>rpm</td>
        </tr>
        <tr class="tooltip-row">
            <td>Rotor Speed</td>
            <td style="text-align: right;">` + parseFloat(value.rotor).toFixed(2) + `</td>
            <td>rpm</td>
        </tr>
        <tr class="tooltip-row">
            <td>Temp Ambient</td>
            <td style="text-align: right;">` + parseFloat(value.temp_a).toFixed(2) + `</td>
            <td>&#8451;</td>
        </tr>
        <tr class="tooltip-row">
            <td>Reactive Power</td>
            <td style="text-align: right;">` + parseFloat(value.react).toFixed(2) + `</td>
            <td>KVAR</td>
        </tr>
        <tr class="tooltip-row">
            <td>Temp Nacelle</td>
            <td style="text-align: right;">` + parseFloat(value.temp_n).toFixed(2) + `</td>
            <td>&#8451;</td>
        </tr>
        <tr class="tooltip-row">
            <td>Nacelle Position</td>
            <td style="text-align: right;">` + parseFloat(value.nacelle).toFixed(2) + `</td>
            <td>&deg;</td>
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
