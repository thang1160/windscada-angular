import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SiteLog } from 'src/app/class/SiteLog';
import { PerformanceTrendComponent } from 'src/app/shared/performance-trend/performance-trend.component';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit, AfterViewInit {

  constructor(private performanceTrendComponent: PerformanceTrendComponent) { }

  public power: any = 0;
  public wind: any = 0;
  public cf: any = 0;
  public avai: any = 0;
  observe: Subscription | undefined;

  public socket = this.performanceTrendComponent.socket;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.resume()
  }

  resume() {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: SiteLog[] = JSON.parse(result);
          for (const item of array) {
            this.setValueKpi(item);
          }
        })
          .catch(x => console.error(x))
      });
  }

  setValueKpi(log: SiteLog) {
    switch (log.name) {
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_V_WIN":
        this.wind = parseFloat(log.value).toFixed(2);
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_POWER_MW":
        this.power = parseFloat(log.value).toFixed(2);
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_CAP_FACTOR":
        this.cf = parseFloat(log.value).toFixed(2);
        break;
      case "Tay_Nguyen_Wind_Farm_Stage_1.Site.SITE_GE_AVAIL":
        this.avai = parseFloat(log.value).toFixed(2);
        break;
      default:
        return;
    }
  }
}
